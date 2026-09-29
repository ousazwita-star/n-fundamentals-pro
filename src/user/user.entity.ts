import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Playlist } from "../playlist/playlist.entity.js";
import { Exclude } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";


@Entity('users')
export class User{
    @PrimaryGeneratedColumn()
    id : number;

    // @Column({nullable : true})
    // phone : string;

    @ApiProperty({
    example: "Jane",
    description: "Provide the first name of the user",
    })
    @Column()
    firstName: string;
    @ApiProperty({
    example: "Doe",
    description: "provide the lastName of the user",
    })
    @Column()
    lastName: string;
    @ApiProperty({
    example: "jane_doe@gmail.com",
    description: "Provide the email of the user",
    })
    @Column({ unique: true })
    email: string;

    @ApiProperty({
        example: "test123#@",
        description: "Provide the password of the user",
    })
    @ApiProperty({
        example: "test123#@",
        description: "Provide the password of the user",
    })
    @ApiProperty({
        example: "test123#@",
        description: "Provide the password of the user",
    })

    @Column()
    @Exclude()
    password: string;

    @OneToMany(()=> Playlist,(playlist)=> playlist.user)
    playlists : Playlist[];
}