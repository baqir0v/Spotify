import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { Genre } from "./Genre.entity";
import { User } from "./User.entity";
import { Music } from "./Music.entity";

@Entity()
export class Album extends CommonEntity {
    @Column()
    title: string
    @Column()
    image: string
    @ManyToMany(() => Genre, (genre) => genre.album)
    genre: Partial<Genre>[]
    @ManyToOne(() => User, (user) => user.albums, { eager: false, nullable: true })
    user: User;
    @OneToMany(() => Music, (music) => music.album)
    music: Music[]
}