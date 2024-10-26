import { ConflictException, Injectable } from "@nestjs/common";
import { PaginationUserDto } from "./dto/pagination-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Entities/User.entity";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepo: Repository<User>
    ) { }

    findAll(params: PaginationUserDto) {
        return this.userRepo.find({
            take: params.limit,
            skip: params.skip || 10
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
}