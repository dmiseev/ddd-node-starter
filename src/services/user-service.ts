import {injectable} from 'inversify';
import {User} from '../entities/user';
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
    public async all(): Promise<User[]> {
        return await this.userRepository.find();
    }

    /**
     *
     * @param {number} id
     * @returns {Promise<void>}
     */
    public async get(id: number): Promise<User> {
        return await this.userRepository.findOneById(id);
    }

    /**
     *
     * @param {string} firstName
     * @param {string} lastName
     *
     * @returns {Promise<User>}
     */
    public async store(firstName: string, lastName: string): Promise<User> {

        let user = new User();

        user.firstName = firstName;
        user.lastName = lastName;

        await this.userRepository.save(user);

        return user;
    }
}