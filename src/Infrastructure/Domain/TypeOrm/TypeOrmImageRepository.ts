import { EntityRepository, EntityManager, getManager } from 'typeorm';
import { ImageRepository } from '../../../Domain/Image/ImageRepository';
import { Image } from '../../../Domain/Image/Image';
import { injectable } from 'inversify';

@injectable()
@EntityRepository()
export class TypeOrmImageRepository implements ImageRepository {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = getManager();
    }

    /**
     * @returns {Promise<Image[]>}
     */
    async all(): Promise<Image[]> {

        return this.entityManager.createQueryBuilder(Image, 'i').getMany();
    }

    /**
     * @param {number} id
     * @returns {Promise<Image>}
     */
    async byId(id: number): Promise<Image> {

        // TODO: throw exception if not exists

        return this.entityManager.createQueryBuilder(Image, 'i')
            .where('i.id = :id')
            .setParameters({id})
            .getOne();
    }

    /**
     * @param {number} userId
     * @returns {Promise<Image[]>}
     */
    byUserId(userId: number): Promise<Image[]> {

        return this.entityManager.createQueryBuilder(Image, 'i')
            .where('i.user = :userId')
            .setParameters({userId})
            .getMany();
    }

    /**
     * @param {Image} image
     * @returns {Promise<Image>}
     */
    async store(image: Image): Promise<Image> {

        return this.entityManager.save(image);
    }
}