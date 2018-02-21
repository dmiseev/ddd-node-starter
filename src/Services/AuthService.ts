import { injectable, inject } from 'inversify';
import { UserRepository } from '../Domain/User/UserRepository';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { User } from '../Domain/User/User';

@injectable()
export class AuthService {

    constructor(@inject('UserRepository') private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @param {string} email
     * @param {string} password
     */
    public signIn(email: string, password: string) {

        this.userRepository.byEmail(email).then((user: User) => {

            bcrypt.compare(password, user.password, function (error, result) {

                if (!result) return;

                return jwt.sign({id: user.id}, process.env.JWT_SECRET);
            });
        });

    }

    /**
     * @param {string} email
     * @param {string} password
     * @param {string} firstName
     * @param {string} lastName
     *
     * @returns {Promise<User>}
     */
    public signUp(email: string, password: string, firstName: string, lastName: string) {

        let user = User.register(
            email,
            bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
            firstName,
            lastName
        );

        return this.userRepository.store(user);
    }

    /**
     * @param {string} email
     * @param {string} password
     */
    public refresh(email: string, password: string) {

        // TODO: implement it
    }


}