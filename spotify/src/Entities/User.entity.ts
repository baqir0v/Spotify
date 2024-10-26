import { Column, Entity, JoinTable, ManyToOne } from "typeorm";
import { CommonEntity } from "./Common.entity";
import { UserRole } from "src/shared/enum/user.enum";
import { Album } from "./Album.entity";

@Entity()
export class User extends CommonEntity{
    @Column()
    userName:string

    @Column()
    nickName:string

    @Column()
    email:string

    @Column()
    password:string

    @Column({default:"https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg"})
    image:string

    @Column()
    isOnline:boolean

    @Column({type:"timestamp"})
    birthDate: Date

    @Column()
    gender: boolean

    @Column({
        type:"enum",
        enum:UserRole,
        // array:false,
        default:UserRole.USER
    })
    role:UserRole[]

    @ManyToOne(()=>Album,(album)=>album.user)
    album:Album
}