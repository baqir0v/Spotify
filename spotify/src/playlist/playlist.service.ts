import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "src/Entities/Playlist.entity";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FindOptionsWhere, Repository } from "typeorm";

@Injectable()
export class PlaylistService{
    constructor(
        @InjectRepository(Playlist)
        private playlistRepo:Repository<Playlist>
    ){}

    findAll(params: PaginationUserDto) {
        return this.playlistRepo.find({
            take: params.limit,
            skip: params.skip || 10
        })
    }

    async findOne(where: FindOptionsWhere<Playlist> | FindOptionsWhere<Playlist>[]) {
        const album = await this.playlistRepo.findOne({ where })
        return album
    }

    async create(){
        return
    }
}