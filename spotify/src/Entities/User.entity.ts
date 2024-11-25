import { Column, Entity, JoinTable, ManyToOne, OneToMany } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { UserRole } from "src/shared/enum/user.enum";
import { Album } from "./Album.entity";
import { Music } from "./Music.entity";
import { Playlist } from "./Playlist.entity";

@Entity()
export class User extends CommonEntity {
    @Column()
    userName: string

    @Column()
    nickName: string

    @Column()
    email: string

    @Column()
    password: string

    @Column({ default: "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg" })
    image: string

    @Column({default:false})
    isOnline: boolean

    @Column({ type: "timestamp" })
    birthDate: Date

    @Column()
    gender: boolean

    @Column({
        type: "enum",
        enum: UserRole,
        // array:false,
        default: UserRole.USER
    })
    role: UserRole[]

    @OneToMany(() => Album, (album) => album.user, { cascade: true })
    albums: Album[];

    @OneToMany(()=>Music,(music)=>music.user,{cascade:true})
    music:Music[]

    @OneToMany(()=>Playlist,(playlist)=>playlist.user)
    playlist:Playlist[]
}