import {injectable} from 'inversify';
import {User} from '../entities/User';
import {getManager, Repository} from 'typeorm';

@injectable()
export class UserService {

    private userRepository: Repository<User>;

    constructor() {
        this.userRepository = getManager().getRepository(User);
    }

    /**
     * @returns {Promise<User[]>}
     */
    public all(): Promise<User[]> {

        return this.userRepository.find();
    }

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    public byId(id: number): Promise<User> {

        return this.userRepository.findOneById(id);
    }

    /**
     * @param {string} firstName
     * @param {string} lastName
     *
     * @returns {Promise<User>}
     */
    public store(firstName: string, lastName: string): Promise<User> {

        return this.userRepository.save(
            User.register(firstName, lastName)
        );
    }
}