import { injectable, inject } from 'inversify';
import { UserRepository } from '../Domain/User/UserRepository';

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

        // TODO: implement it
    }

    /**
     * @param {string} email
     * @param {string} password
     */
    public signUp(email: string, password: string) {

        // TODO: implement it
    }

    /**
     * @param {string} email
     * @param {string} password
     */
    public refresh(email: string, password: string) {

        // TODO: implement it
    }
}