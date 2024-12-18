import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ClsService } from "nestjs-cls";
import { Album } from "src/Entities/Album.entity";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreateAlbumDto } from "./dto/create-album.dto";
import { Genre } from "src/Entities/Genre.entity";
import { GenreService } from "src/genre/genre.service";
import { User } from "src/Entities/User.entity";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";

@Injectable()
export class AlbumService {
    constructor(
        private cls: ClsService,
        @InjectRepository(Album)
        private albumRepo: Repository<Album>,
        @InjectRepository(Genre)
        private genreRepo: Repository<Genre>,
        private genreService: GenreService,
        private cloudinaryService: CloudinaryService
    ) { }

    findAll(params: PaginationUserDto) {
        return this.albumRepo.find({
            take: params.limit || 10,
            skip: params.skip
        })
    }

    async findOne(where: FindOptionsWhere<Album> | FindOptionsWhere<Album>[]) {
        const album = await this.albumRepo.findOne({
            where,
            relations: ['user', 'genre'], 
        });
    
        if (!album) {
            throw new NotFoundException('Album not found');
        }
    
        if (album.user) {
            album.user = {
                id: album.user.id,
                role: album.user.role,
            } as User; 
        }
    
        return album;
    }
    
    async create(params: CreateAlbumDto,file:Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('Music file is required');
        }

        const me = await this.cls.get('user')
        console.log(me);

        const imageResult = await this.cloudinaryService.uploadFile(file.buffer);

        const genre = await this.genreService.findOne({ id: params.genre })

        if (!genre) throw new NotFoundException("Genre not found")

        const album = this.albumRepo.create({
            ...params,
            image:imageResult.secure_url,
            genre: [genre],
            user: me
        })

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