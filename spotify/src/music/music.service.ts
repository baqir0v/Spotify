import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Music } from "src/Entities/Music.entity";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FindOptionsWhere, In, Repository } from "typeorm";
import { CreateMusicDto } from "./dto/create-music.dto";
import { GenreService } from "src/genre/genre.service";
import { CloudinaryService } from "src/cloudinary/cloudinary.service";
import { User } from "src/Entities/User.entity";
import { ClsService } from "nestjs-cls";
import { Album } from "src/Entities/Album.entity";

@Injectable()
export class MusicService {
    constructor(
        @InjectRepository(Music)
        private musicRepo: Repository<Music>,
        @InjectRepository(Album)
        private albumRepo: Repository<Album>,
        private genreService: GenreService,
        private cloudinaryService: CloudinaryService,
        private cls: ClsService,
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

        let user = await this.cls.get<User>("user")

        if (user) {
            user = {
                id: user.id,
                role: user.role,
            } as User;
        }

        const uploadResult = await this.cloudinaryService.uploadFile(file.buffer);

        console.log(params.genre);

        const album = await this.albumRepo.findOne({ where: { id: params.album } });

        const genres = await this.genreService.findByIds(params.genre);

        console.log(genres);

        if (!genres || genres.length === 0) {
            throw new NotFoundException('No genres found for the given IDs');
        }

        const music = this.musicRepo.create({
            ...params,
            song: uploadResult.secure_url,
            genre: genres,
            user,
            album,
        });

        return this.musicRepo.save(music);
    }

    async changeImage(id: number, file: Express.Multer.File) {
        const me = await this.cls.get<User>("user")

        if (!me) {
            throw new UnauthorizedException("User is not logged in");
        }

        if (!file) {
            throw new BadRequestException("Image file is required");
        }

        const imageResult = await this.cloudinaryService.uploadFile(file.buffer);

        const music = await this.musicRepo.findOne({ where: { id: id } })

        music.image = imageResult.secure_url

        await this.musicRepo.save(music);

        return {
            message: "Image updated successfully",
            imageUrl: music.image
        };
    }

    async delete(id: number) {
        const music = await this.musicRepo.findOne({ where: { id } });

        if (!music) {
            throw new NotFoundException(`Album with ID ${id} not found`);
        }

        await this.musicRepo.remove(music);

        return music
    }

}
