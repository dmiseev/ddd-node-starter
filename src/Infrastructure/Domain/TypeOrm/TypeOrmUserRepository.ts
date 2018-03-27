import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { UserRepository } from '../../../Domain/User/UserRepository';
import { User } from '../../../Domain/User/User';
import { injectable } from 'inversify';
import { UserNotFound } from '../../../Domain/User/UserNotFound';
import { Pagination } from '../../../Domain/Core/Pagination';
import { TypeOrmRepository } from './TypeOrmRepository';
import { ObjectType } from 'typeorm/common/ObjectType';

@injectable()
@EntityRepository()
export class TypeOrmUserRepository extends TypeOrmRepository implements UserRepository {

    /**
     * @param {Pagination} pagination
     * @returns {Promise<[User[] , number]>}
     */
    public all(pagination: Pagination): Promise<[User[], number]> {

        return this.createQueryBuilder()
            .leftJoinAndSelect('u.images', 'i')
            .orderBy('u.id', 'DESC')
            .skip(pagination.offset())
            .take(pagination.perPage())
            .getManyAndCount();
    }

    /**
     * @param {number} id
     * @returns {Promise<User>}
     */
    public byId(id: number): Promise<User> {

        return this.createQueryBuilder()
            .leftJoinAndSelect('u.friends', 'uf')
            .andWhere('u.id = :id')
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

        return this.createQueryBuilder()
            .andWhere('u.email = :email')
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

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected createQueryBuilder(entityClass: ObjectType<any> = User, alias: string = 'u'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}