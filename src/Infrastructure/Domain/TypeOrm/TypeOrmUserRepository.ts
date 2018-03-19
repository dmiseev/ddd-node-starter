import { EntityRepository, EntityManager, getManager } from 'typeorm';
import { UserRepository } from '../../../Domain/User/UserRepository';
import { User } from '../../../Domain/User/User';
import { injectable } from 'inversify';
import { UserNotFound } from '../../../Domain/User/UserNotFound';
import { Pagination } from '../../../Domain/Core/Pagination';

@injectable()
@EntityRepository()
export class TypeOrmUserRepository implements UserRepository {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager();
    }

    /**
     * @param {Pagination} pagination
     * @returns {Promise<[User[] , number]>}
     */
    public all(pagination: Pagination): Promise<[User[], number]> {

        return this.entityManager.createQueryBuilder(User, 'u')
            .leftJoinAndSelect('u.images', 'i')
            .orderBy('u.id', 'DESC')
            .offset(pagination.offset())
            .limit(pagination.perPage())
            .getManyAndCount();
    }

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    public byId(id: number): Promise<User> {

        return this.entityManager.createQueryBuilder(User, 'u')
            .where('u.id = :id')
            .setParameters({id})
            .getOne()
            .then((user: User) => {
                if (!user) throw UserNotFound.fromId(id);
                return user;
            });
    }

    /**
     * @param {string} email
     * @returns {Promise<User>}
     */
    public byEmail(email: string): Promise<User> {

        return this.entityManager.createQueryBuilder(User, 'u')
            .where('u.email = :email')
            .setParameters({email})
            .getOne()
            .then((user: User) => {
                if (!user) throw UserNotFound.fromEmail(email);
                return user;
            });
    }

    /**
     * @param {User} user
     * @returns {Promise<User>}
     */
    public store(user: User): Promise<User> {

        return this.entityManager.save(user);
    }
}