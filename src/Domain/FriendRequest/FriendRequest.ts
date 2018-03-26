import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User';

@Entity('friend_requests')
export class FriendRequest {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'sender_id', referencedColumnName: 'id' })
    sender: User;

    @ManyToOne(type => User)
    @JoinColumn({ name: 'receiver_id', referencedColumnName: 'id' })
    receiver: User;

    @Column({
        name: 'created_at',
        type: 'timestamp',
        nullable: false
    })
    createdAt: Date;

    @Column({
        name: 'deleted_at',
        type: 'timestamp',
        nullable: true
    })
    deletedAt: Date;

    public remove(): void {
        this.deletedAt = new Date();
    }
}