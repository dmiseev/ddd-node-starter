import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../User/User';

@Entity('images')
export class Image {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: 'name', type: 'varchar', length: 255, nullable: false})
    name: string;

    @Column({name: 'path', type: 'varchar', length: 255, nullable: false})
    path: string;

    @Column({name: 'created_at', type: 'timestamp', nullable: false})
    createdAt: Date;

    @ManyToOne(type => User, user => user.images)
    @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
    user: User;
}