import {injectable} from 'inversify';
import User from '../entities/user';

@injectable()
export class UserService {

    private users: Array<User>;

    constructor() {
        this.users = [
            new User(1, 'ak_only'),
            new User(2, 'Janjo'),
            new User(3, 'Тренер'),
        ]
    }

    public all(): Array<User> {
        return this.users;
    }

    public get(id: number) {
        return this.users.filter((user: User) => user.getId() === id)[0];
    }
}