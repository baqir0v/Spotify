import { Column, Entity, ManyToMany, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { Genre } from "./Genre.entity";
import { User } from "./User.entity";

@Entity()
export class Album extends CommonEntity {
    @Column()
    title: string
    @Column()
    image: string
    @ManyToMany(() => Genre, (genre) => genre.album)
    genre: Partial<Genre>[]
    @OneToMany(()=>User,(user)=>user.album)
    user:User[]
}