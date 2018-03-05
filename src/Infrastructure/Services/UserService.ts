import { injectable, inject } from 'inversify';
import { User } from '../../Domain/User/User';
import { UserRepository } from '../../Domain/User/UserRepository';
import { IUserService } from '../../Domain/User/IUserService';

@injectable()
export class UserService implements IUserService {

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
}