import { injectable, inject } from 'inversify';
import { IImageService } from '../../Domain/Image/IImageService';
import { ImageRepository } from '../../Domain/Image/ImageRepository';
import { Image } from '../../Domain/Image/Image';
import { User } from '../../Domain/User/User';
import { ImageDTO } from '../DTO/Image/ImageDTO';

@injectable()
export class ImageService implements IImageService {

    constructor(@inject('ImageRepository') private imageRepository: ImageRepository) {
        this.imageRepository = imageRepository;
    }

    /**
     * @returns {Promise<Image[]>}
     */
    public all(): Promise<Image[]> {

        return this.imageRepository.all();
    }

    /**
     * @param {ImageDTO} DTO
     * @param {User} user
     *
     * @returns {Promise<Image>}
     */
    public store(DTO: ImageDTO, user: User): Promise<Image> {

        let image = Image.register(user, DTO.name, DTO.path);
        return this.imageRepository.store(image);
    }
}