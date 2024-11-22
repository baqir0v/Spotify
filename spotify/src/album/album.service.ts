import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { Album } from "src/Entities/Album.entity";
import { User } from "src/Entities/User.entity";
import { FindOneParams, FindParams } from "src/shared/types/find.params";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { Genre } from "src/Entities/Genre.entity";
import { GenreService } from "src/genre/genre.service";

@Injectable()
export class AlbumService {
    constructor(
        private cls: ClsService,
        @InjectRepository(Album)
        private albumRepo: Repository<Album>,
        @InjectRepository(Genre)
        private genreRepo: Repository<Genre>,
        private genreService: GenreService
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

    async create(params: CreateAlbumDto) {
        const me = await this.cls.get('user')
        console.log(me);
        

        const genre = await this.genreService.findOne({ id: params.genre })

        if (!genre) throw new NotFoundException("Genre not found")

        const album = this.albumRepo.create({
            ...params,
            genre: [genre],
            user: me
        })
        // console.log(album.user);
        

        return this.albumRepo.save(album);
    }

    async remove(id: number) {
        const album = await this.albumRepo.findOne({ where: { id } });

        if (!album) {
            throw new NotFoundException(`Album with ID ${id} not found`);
        }

        await this.albumRepo.remove(album);

        return album
    }
}