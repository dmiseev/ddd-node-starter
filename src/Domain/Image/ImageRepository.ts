import { Image } from './Image';

export interface ImageRepository {

    /**
     * @returns {Promise<Image[]>}
     */
    all(): Promise<Image[]>;

    /**
     * @param {number} id
     * @returns {Promise<Image>}
     */
    byId(id: number): Promise<Image>;

    /**
     * @param {number} userId
     * @returns {Promise<Image[]>}
     */
    byUserId(userId: number): Promise<Image[]>;

    /**
     * @param {Image} user
     */
    store(user: Image): Promise<Image>;
}