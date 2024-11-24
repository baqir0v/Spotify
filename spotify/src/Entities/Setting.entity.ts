import { Column, Entity } from "typeorm";
import { CommonEntity } from "./Common.entity";

@Entity()
export class Settings extends CommonEntity {
    @Column({ nullable: true })
    siteName: string;

    @Column({ nullable: true })
    logo: string;

    @Column({ nullable: true })
    aboutUs: string;

    @Column({ nullable: true })
    contactDetails: string;
}