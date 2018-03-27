import { EntityManager, getManager, SelectQueryBuilder } from 'typeorm';
import { ObjectType } from 'typeorm/common/ObjectType';
import { injectable } from 'inversify';

@injectable()
export abstract class TypeOrmRepository {

    public entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager();
    }

    /**
     * @param {ObjectType<any>} entityClass
     * @param {string} alias
     *
     * @returns {SelectQueryBuilder<any>}
     */
    protected abstract createQueryBuilder(entityClass: ObjectType<any>, alias: string): SelectQueryBuilder<any>;
}