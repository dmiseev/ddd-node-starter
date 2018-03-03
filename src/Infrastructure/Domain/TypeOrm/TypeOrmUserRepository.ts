import { EntityRepository, EntityManager, getManager } from 'typeorm';
import { UserRepository } from '../../../Domain/User/UserRepository';
import { User } from '../../../Domain/User/User';
import { injectable } from 'inversify';

@injectable()
@EntityRepository()
export class TypeOrmUserRepository implements UserRepository{

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager();
    }

    /**
     * @returns {Promise<User[]>}
     */
    async all(): Promise<User[]> {

        return this.entityManager.createQueryBuilder(User, 'u')
            .leftJoinAndSelect('u.images', 'i')
            .getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    async byId(id: number): Promise<User> {

        // TODO: throw exception if not exists

        return this.entityManager.createQueryBuilder(User, 'u')
            .where('u.id = :id')
            .setParameters({ id })
            .getOne();
    }

    /**
     * @param {string} email
     * @returns {Promise<User>}
     */
    byEmail(email: string): Promise<User> {

        return this.entityManager.createQueryBuilder(User, 'u')
            .where('u.email = :email')
            .setParameters({ email })
            .getOne();
    }

    /**
     * @param {User} user
     * @returns {Promise<User>}
     */
    async store(user: User): Promise<User> {

        return this.entityManager.save(user);
    }
}