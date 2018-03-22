import { injectable, inject } from 'inversify';
import { User } from '../../Domain/User/User';
import { UserRepository } from '../../Domain/User/UserRepository';
import { IUserService } from '../../Domain/User/IUserService';
import { Pagination } from '../../Domain/Core/Pagination';
import { ProfileDTO } from '../DTO/Profile/ProfileDTO';
import { UserNotFound } from '../../Domain/User/UserNotFound';

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

    /**
     * @param {number} id
     * @param {ProfileDTO} DTO
     * @returns {Promise<User>}
     */
    update(id: number, DTO: ProfileDTO): Promise<User> {

        return this.userRepository.byId(id)
            .then((user: User) => {

                if (!user) throw UserNotFound.fromId(id);

                user.email = DTO.email;
                user.firstName = DTO.firstName;
                user.lastName = DTO.lastName;

                return this.userRepository.store(user);
            });
    }

    /**
     * @param {number} id
     * @returns {Promise<void>}
     */
    public remove(id: number): Promise<void> {

        return this.userRepository.byId(id)
            .then((user: User) => {
                user.remove();
                this.userRepository.store(user);
            });
    }
}