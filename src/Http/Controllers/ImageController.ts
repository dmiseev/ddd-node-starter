import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { authMiddleware } from '../Middleware/CustomMiddleware';
import { IRequest } from '../../Utils/Request/custom';
import { Image } from '../../Domain/Image/Image';
import { IImageService } from '../../Domain/Image/IImageService';
import { ImageDTO } from '../../Infrastructure/DTO/Image/ImageDTO';
import * as validate from 'express-validation';
import * as imageValidator from '../../Infrastructure/Validators/Image/ImageValidator';

@controller('/images', authMiddleware)
export class ImageController {

    constructor(@inject('IImageService') private imageService: IImageService) {
    }

    /**
     * @returns {Promise<Image>}
     */
    @httpPost('/', validate(imageValidator))
    public async store(request: IRequest): Promise<Image> {

        return await this.imageService.store(
            ImageDTO.fromRequest(request),
            request.user
        );
    }
}