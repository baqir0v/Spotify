import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "src/Entities/Music.entity";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FindOptionsWhere, In, Repository } from "typeorm";
import { CreateMusicDto } from "./dto/create-music.dto";
import { GenreService } from "src/genre/genre.service";

@Injectable()
export class MusicService {
    constructor(
        @InjectRepository(Music)
        private musicRepo: Repository<Music>,
        private genreService: GenreService
    ) { }

    findAll(params: PaginationUserDto) {
        return this.musicRepo.find({
            take: params.limit,
            skip: params.skip || 10
        })
    }

    async findOne(where: FindOptionsWhere<Music> | FindOptionsWhere<Music>[]) {
        const album = await this.musicRepo.findOne({ where })
        return album
    }

    async create(params: CreateMusicDto) {
        const genres = await this.genreService.findByIds(params.genre)

        if (!genres || genres.length === 0) {
            throw new NotFoundException('No genres found for the given IDs');
        }

        const music = this.musicRepo.create({
            ...params,
            genre: genres,
            user: { id: params.user },
            album: { id: params.album }
        });

        return this.musicRepo.save(music);
    }
}