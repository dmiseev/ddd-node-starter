import { EntityRepository, SelectQueryBuilder } from 'typeorm';
import { ImageRepository } from '../../../Domain/Image/ImageRepository';
import { Image } from '../../../Domain/Image/Image';
import { injectable } from 'inversify';
import { TypeOrmRepository } from './TypeOrmRepository';
import { ObjectType } from 'typeorm/common/ObjectType';
import { ImageNotFound } from '../../../Domain/Image/ImageNotFound';

@injectable()
@EntityRepository()
export class TypeOrmImageRepository extends TypeOrmRepository implements ImageRepository {

    /**
     * @returns {Promise<Image[]>}
     */
    public all(): Promise<Image[]> {

        return this.createQueryBuilder()
            .getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<Image>}
     */
    public byId(id: number): Promise<Image> {

        return this.createQueryBuilder()
            .andWhere('i.id = :id')
            .setParameters({id})
            .getOne()
            .then((image: Image) => {
                if (!image) throw ImageNotFound.fromId(id);
                return image;
            });
    }

    /**
     * @param {number} userId
     * @returns {Promise<Image[]>}
     */
    public byUserId(userId: number): Promise<Image[]> {

        return this.createQueryBuilder()
            .andWhere('i.user = :userId')
            .setParameters({userId})
            .getMany();
    }

    /**
     * @param {Image} image
     * @returns {Promise<Image>}
     */
    public store(image: Image): Promise<Image> {

        return this.entityManager.save(image);
    }

    protected createQueryBuilder(entityClass: ObjectType<any> = Image, alias: string = 'i'): SelectQueryBuilder<any> {

        return this.entityManager.createQueryBuilder(entityClass, alias)
            .select(alias)
            .where(alias + '.deletedAt IS NULL');
    }
}