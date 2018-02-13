import { EntityRepository, EntityManager, getManager } from 'typeorm';
import { UserRepository } from '../../../Domain/User/UserRepository';
import { User } from '../../../Domain/User/User';
import { injectable, inject } from 'inversify';

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

        let users = this.entityManager.createQueryBuilder()
            .select()
            .from(User, 'u')
            .getMany();

        users.then((users: User[]) => {
            console.log(users);
        });

        return users;
    }

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    async byId(id: number): Promise<User> {

        return this.entityManager.createQueryBuilder()
            .select()
            .from(User, 'u')
            .where('u.id = :id')
            .setParameters({ id })
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