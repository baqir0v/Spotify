import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Playlist } from "src/Entities/Playlist.entity";
import { PaginationUserDto } from "src/user/dto/pagination-user.dto";
import { FindOptionsWhere, Repository } from "typeorm";
import { CreatePlaylistDto } from "./dto/create-playlist.dto";
import { ClsService } from "nestjs-cls";
import { User } from "src/Entities/User.entity";
import { Music } from "src/Entities/Music.entity";
import { PlaylistMusic } from "src/Entities/PlaylistMusic.entity";
import { ReorderPlaylistDto } from "./dto/reorder.dto";

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(Playlist)
        private playlistRepo: Repository<Playlist>,
        @InjectRepository(Music)
        private musicRepo: Repository<Music>,
        @InjectRepository(PlaylistMusic)
        private playlistMusicRepo: Repository<PlaylistMusic>,
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

    async getPlaylistWithMusic(playlistId: number) {
        const playlist = await this.playlistRepo
            .createQueryBuilder('playlist')
            .leftJoinAndSelect('playlist.playlistMusics', 'playlistMusic')
            .leftJoinAndSelect('playlistMusic.music', 'music')
            .where('playlist.id = :playlistId', { playlistId })
            .orderBy('playlistMusic.order', 'ASC') 
            .getOne();

        if (!playlist) {
            throw new NotFoundException('Playlist not found');
        }

        return playlist;
    }


    async addMusicToPlaylist(playlistId: number, musicIds: number[], order?: number[]) {
        const playlist = await this.playlistRepo.findOne({
            where: { id: playlistId },
        });
    
        if (!playlist) {
            throw new NotFoundException('Playlist not found');
        }
    
        const musics = await this.musicRepo.findByIds(musicIds);
    
        if (musics.length !== musicIds.length) {
            throw new NotFoundException('One or more music IDs are invalid');
        }
    
        const maxOrderResult = await this.playlistMusicRepo
            .createQueryBuilder('playlistMusic')
            .select('MAX(playlistMusic.order)', 'maxOrder')
            .where('playlistMusic.playlistId = :playlistId', { playlistId })
            .getRawOne();
        const currentMaxOrder = maxOrderResult?.maxOrder || 0;
    
        for (let i = 0; i < musics.length; i++) {
            const playlistMusic = new PlaylistMusic();
            playlistMusic.playlist = playlist;
            playlistMusic.music = musics[i];
            playlistMusic.order = order && order[i] ? order[i] : currentMaxOrder + i + 1;
    
            await this.playlistMusicRepo.save(playlistMusic);
        }
    
        return { message: 'Music added to playlist successfully' };
    }
    

    async reorderMusicInPlaylist(params: ReorderPlaylistDto) {
        const { playlistId, musicOrder } = params;

        // Fetch the playlist and validate existence
        const playlist = await this.playlistRepo.findOne({
            where: { id: playlistId },
            relations: ['playlistMusics', 'playlistMusics.music'],
        });

        if (!playlist) {
            throw new NotFoundException('Playlist not found');
        }

        // Validate that provided music IDs exist in the playlist
        const musicIdsInPlaylist = playlist.playlistMusics.map((pm) => pm.music.id);
        const invalidIds = musicOrder
            .map((mo) => mo.musicId)
            .filter((id) => !musicIdsInPlaylist.includes(id));

        if (invalidIds.length > 0) {
            throw new NotFoundException(`Music IDs not in playlist: ${invalidIds.join(', ')}`);
        }

        // Update the order for each music in the playlist
        for (const { musicId, order } of musicOrder) {
            const result = await this.playlistMusicRepo.update(
                { playlist: { id: playlistId }, music: { id: musicId } },
                { order }
            );

            // Check if the update was successful
            if (result.affected === 0) {
                throw new NotFoundException(
                    `Music with ID ${musicId} not found in playlist ${playlistId}`
                );
            }
        }

        return { message: 'Music order updated successfully' };
    }
    
    
}