import { User } from '../../Domain/User/User';
import * as bcrypt from 'bcrypt';

export class UserFactory {

    /**
     * @return {User[]}
     */
    public static fakeUsers(): User[] {

        let users = [];

        let user1 = User.register(
            'alex.clare@test.com',
            bcrypt.hashSync('testpass', bcrypt.genSaltSync(10)),
            'Alex',
            'Clare'
        );

        let user2 = User.register(
            'jack.green@test.com',
            bcrypt.hashSync('testpass', bcrypt.genSaltSync(10)),
            'Jack',
            'Green'
        );

        users.push(user1);
        users.push(user2);

        return users;
    }
}