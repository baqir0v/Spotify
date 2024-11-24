import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PaginationUserDto } from "./dto/pagination-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Entities/User.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { ClsService } from "nestjs-cls";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>,
        private cls:ClsService,
        private cloudinaryService: CloudinaryService

    ) { }

    findAll(params: PaginationUserDto) {
        return this.userRepo.find({
            take: params.limit || 10,
            skip: params.skip
        })
    }

    async findOne(where: FindOptionsWhere<User> | FindOptionsWhere<User>[]) {
        const user = await this.userRepo.findOne({ where })
        return user
    }

    async create(params: Partial<CreateUserDto>) {
        const emailExists = await this.findOne({ email: params.email })
        if (emailExists) throw new ConflictException("Email already exits")

        const userNameExists = await this.findOne({ userName: params.userName })
        if (userNameExists) throw new ConflictException("Username already exits")

        const user = this.userRepo.create(params)

        return this.userRepo.save(user)
    }

    async changeImage(file:Express.Multer.File){
        const me = await this.cls.get<User>("user")

        if (!me) {
            throw new UnauthorizedException("User is not logged in");
        }
    
        if (!file) {
            throw new BadRequestException("Image file is required");
        }

        const imageResult = await this.cloudinaryService.uploadFile(file.buffer);

        const user = await this.userRepo.findOne({where:{id:me.id}})

        user.image = imageResult.secure_url

        await this.userRepo.save(user);

        return {
            message: "Image updated successfully",
            imageUrl: user.image
        };
    }
}