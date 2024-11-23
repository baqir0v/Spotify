import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Playlist } from './Playlist.entity';
import { Music } from './Music.entity';

@Entity()
export class PlaylistMusic {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Playlist, (playlist) => playlist.playlistMusics, { onDelete: 'CASCADE' })
    playlist: Playlist;

    @ManyToOne(() => Music, (music) => music.playlistMusics, { onDelete: 'CASCADE' })
    music: Music;

    @Column({ nullable: true })
    order: number;
}
