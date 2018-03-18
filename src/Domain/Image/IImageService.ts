import { Image } from './Image';
import { ImageDTO } from '../../Infrastructure/DTO/Image/ImageDTO';
import { User } from '../User/User';

export interface IImageService {

    /**
     * @returns {Promise<Image[]>}
     */
    all(): Promise<Image[]>;

    /**
     * @param {ImageDTO} DTO
     * @param {User} user
     *
     * @returns {Promise<Image>}
     */
    store(DTO: ImageDTO, user: User): Promise<Image>;
}