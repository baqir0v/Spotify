import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { User } from "./User.entity";
import { Album } from "./Album.entity";
import { Genre } from "./Genre.entity";
import { Playlist } from "./Playlist.entity";

@Entity()
export class Music extends CommonEntity {
    @Column()
    title: string

    @Column()
    image: string

    @Column()
    song: string

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