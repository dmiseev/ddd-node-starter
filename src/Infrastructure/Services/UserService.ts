import { injectable, inject } from 'inversify';
import { User } from '../../Domain/User/User';
import { UserRepository } from '../../Domain/User/UserRepository';
import { IUserService } from '../../Domain/User/IUserService';
import { Pagination } from '../../Domain/Core/Pagination';

@injectable()
export class UserService implements IUserService {

    constructor(@inject('UserRepository') private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    /**
     * @param {Pagination} pagination
     * @returns {Promise<User[]>}
     */
    public all(pagination: Pagination): Promise<[User[], number]> {

        return this.userRepository.all(pagination);
    }

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    public byId(id: number): Promise<User> {

        return this.userRepository.byId(id);
    }
}