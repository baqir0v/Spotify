import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { User } from "./User.entity";
import { Music } from "./Music.entity";

@Entity()
export class Playlist extends CommonEntity{
    @Column()
    name:string

    @Column({nullable:true})
    description:string

    @ManyToOne(()=>User,(user)=>user.playlist,{cascade:true})
    user:User

    @ManyToMany(()=>Music,(music)=>music.playlist,{nullable:true})
    @JoinTable()
    music:Music[]
}