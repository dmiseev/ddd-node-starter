import { Entity, PrimaryGeneratedColumn, Column, JoinColumn, ManyToOne } from 'typeorm';
import { User } from '../User/User';

@Entity('friend_requests')
export class FriendRequest {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(type => User, {cascadeInsert: true, cascadeUpdate: true})
    @JoinColumn({name: 'sender_id', referencedColumnName: 'id'})
    sender: User;

    @ManyToOne(type => User, {cascadeInsert: true, cascadeUpdate: true})
    @JoinColumn({name: 'receiver_id', referencedColumnName: 'id'})
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

    constructor(sender: User, receiver: User, createdAt: Date) {
        this.sender = sender;
        this.receiver = receiver;
        this.createdAt = createdAt;
    }

    /**
     * @param {User} sender
     * @param {User} receiver
     *
     * @returns {FriendRequest}
     */
    static register(sender: User, receiver: User): FriendRequest {
        return new FriendRequest(sender, receiver, new Date());
    }

    public remove(): void {
        this.deletedAt = new Date();
    }
}