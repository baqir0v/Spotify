import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "src/Entities/Music.entity";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FindOptionsWhere, In, Repository } from "typeorm";
import { CreateMusicDto } from "./dto/create-music.dto";
import { GenreService } from "src/genre/genre.service";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { User } from "src/Entities/User.entity";

@Injectable()
export class MusicService {
    constructor(
        @InjectRepository(Music)
        private musicRepo: Repository<Music>,
        private genreService: GenreService,
        private cloudinaryService: CloudinaryService
    ) { }

    findAll(params: PaginationUserDto) {
        return this.musicRepo.find({
            take: params.limit || 10,
            skip: params.skip
        })
    }

    async findOne(where: FindOptionsWhere<Music> | FindOptionsWhere<Music>[]) {
        const music = await this.musicRepo.findOne({
            where,
            relations: ["user", "genre", "album"]
        })

        if (music.user) {
            music.user = {
                id: music.user.id,
                role: music.user.role,
            } as User;
        }
        return music
    }

    async create(params: CreateMusicDto, file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException('Music file is required');
        }

        const uploadResult = await this.cloudinaryService.uploadFile(file.buffer);

        const genres = await this.genreService.findByIds(params.genre);

        if (!genres || genres.length === 0) {
            throw new NotFoundException('No genres found for the given IDs');
        }

        const music = this.musicRepo.create({
            ...params,
            song: uploadResult.secure_url,
            genre: genres,
            user: { id: params.user },
            album: { id: params.album },
        });

        return this.musicRepo.save(music);
    }

}

// export const multerOptions = {
//     storage: multer.memoryStorage(),
// };