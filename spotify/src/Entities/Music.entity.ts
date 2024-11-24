import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { User } from "./User.entity";
import { Album } from "./Album.entity";
import { Genre } from "./Genre.entity";
import { Playlist } from "./Playlist.entity";
import { PlaylistMusic } from "./PlaylistMusic.entity";

@Entity()
export class Music extends CommonEntity {
    @Column()
    title: string

    @Column({default:"https://res.cloudinary.com/dj1tjerlk/image/upload/v1732461444/ffrgsapjyiuq0clq1u9d.jpg"})
    image: string

    @Column()
    song: string

    @OneToMany(() => PlaylistMusic, (playlistMusic) => playlistMusic.music)
    playlistMusics: PlaylistMusic[];

    @ManyToOne(() => User, (user) => user.music)
    user: User

    @ManyToOne(() => Album, (album) => album.music)
    album: Album
    
    @ManyToMany(() => Genre, (genre) => genre.music, { cascade: true })
    @JoinTable()
    genre: Genre[];

    @ManyToMany(()=>Playlist,(playlist)=>playlist.music)
    playlist:Playlist[]
}