import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { User } from "./User.entity";
import { Music } from "./Music.entity";
import { PlaylistMusic } from "./PlaylistMusic.entity";

@Entity()
export class Playlist extends CommonEntity{
    @Column()
    name:string

    @Column({nullable:true})
    description:string

    @OneToMany(() => PlaylistMusic, (playlistMusic) => playlistMusic.playlist)
    playlistMusics: PlaylistMusic[];

    @ManyToOne(()=>User,(user)=>user.playlist,{cascade:true})
    user:User

    @ManyToMany(()=>Music,(music)=>music.playlist,{nullable:true})
    @JoinTable()
    music:Music[]
}