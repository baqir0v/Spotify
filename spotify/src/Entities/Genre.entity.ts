import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { Album } from "./Album.entity";

@Entity()
export class Genre extends CommonEntity{
    @Column()
    genre_name:string
    @ManyToMany(()=>Album,(album)=>album.genre,{cascade:true})
    @JoinTable()
    album:Album
}