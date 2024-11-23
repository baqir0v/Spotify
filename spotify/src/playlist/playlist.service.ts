import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "src/Entities/Playlist.entity";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { ClsService } from "nestjs-cls";
import { User } from "src/Entities/User.entity";
import { AddMusicToPlaylistDto } from "./dto/add-to-playlist.dot";
import { Music } from "src/Entities/Music.entity";

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepo: Repository<Playlist>,
        @InjectRepository(Music)
        private musicRepo: Repository<Music>,
        private cls: ClsService,
    ) { }

    findAll(params: PaginationUserDto) {
        return this.playlistRepo.find({
            take: params.limit || 10,
            skip: params.skip
        })
    }

    async findOne(where: FindOptionsWhere<Playlist> | FindOptionsWhere<Playlist>[]) {
        const album = await this.playlistRepo.findOne({ where })
        return album
    }

    async create(params: CreatePlaylistDto) {
        const me = await this.cls.get<User>("user")

        const playlist = this.playlistRepo.create({
            ...params,
            user: { id: me.id },
        })

        return this.playlistRepo.save(playlist)
    }

    async addMusicToPlaylist(params: AddMusicToPlaylistDto) {
        const playlist = await this.playlistRepo.findOne({
            where: { id: params.playlistId }
        })

        if (!playlist) throw new NotFoundException("Playlist not found")

        const musics = await this.musicRepo.findByIds(params.musicIds)

        if (musics.length !== params.musicIds.length) {
            throw new NotFoundException('One or more music IDs are invalid');
        }

        playlist.music = [...(playlist.music || []), ...musics];

        return this.playlistRepo.save(playlist);
    }


}