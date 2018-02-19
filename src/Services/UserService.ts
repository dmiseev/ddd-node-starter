import { injectable, inject } from 'inversify';
import { User } from '../Domain/User/User';
import { UserRepository } from '../Domain/User/UserRepository';

@injectable()
export class UserService {

    constructor(@inject('UserRepository') private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @returns {Promise<User[]>}
     */
    public all(): Promise<User[]> {

        return this.userRepository.all();
    }

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    public byId(id: number): Promise<User> {

        return this.userRepository.byId(id);
    }

    /**
     * @param {string} email
     * @param {string} password
     * @param {string} firstName
     * @param {string} lastName
     *
     * @returns {Promise<User>}
     */
    public store(email: string, password: string, firstName: string, lastName: string): Promise<User> {

        return this.userRepository.store(
            User.register(email, password, firstName, lastName)
        );
    }
}