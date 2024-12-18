import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Genre } from "src/Entities/Genre.entity";
import { FindOptionsWhere, In, Repository } from "typeorm";
import { PaginationGenreDto } from "./dto/pagination-genre.dto";
import { CreateGenreDto } from "./dto/create-genre.dto";

@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(Genre)
        private genreRepo: Repository<Genre>
    ) { }

    findAll(params: PaginationGenreDto) {
        return this.genreRepo.find({
            take: params.limit || 10,
            skip: params.skip
        })
    }

    async findOne(where: FindOptionsWhere<Genre> | FindOptionsWhere<Genre>[]) {
        const user = await this.genreRepo.findOne({ where })
        return user
    }

    async findByIds(ids: number[]) {
        const genres = await this.genreRepo.find({
            where: { id: In(ids) },
        });
        return genres;
    }

    async create(params: CreateGenreDto) {
        const genre = this.genreRepo.create({ genre_name: params.genre_name })

        return this.genreRepo.save(genre)
    }

    async delete(id:number){
        const genre = await this.genreRepo.findOne({where:{id}})

        if(!genre) throw new NotFoundException("This genre doesn't exist")

        await this.genreRepo.remove(genre)

        return genre
    }
}