import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { Album } from "src/Entities/Album.entity";
import { User } from "src/Entities/User.entity";
import { FindOneParams, FindParams } from "src/shared/types/find.params";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class AlbumService {
    constructor(
        private cls: ClsService,
        @InjectRepository(Album)
        private albumRepo: Repository<Album>
    ) { }

    findAll(params: PaginationUserDto) {
        return this.albumRepo.find({
            take: params.limit,
            skip: params.skip || 10
        })
    }

    async findOne(where: FindOptionsWhere<Album> | FindOptionsWhere<Album>[]) {
        const album = await this.albumRepo.findOne({ where })
        return album
    }

    async create(){
        const me = this.cls.get<User>("user")
    }
}