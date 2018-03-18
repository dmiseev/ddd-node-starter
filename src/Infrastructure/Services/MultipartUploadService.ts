import { injectable } from 'inversify';
import { IUploadService } from '../../Domain/Core/IUploadService';
import { IRequest } from '../../Utils/Request/custom';

@injectable()
export class MultipartUploadService implements IUploadService{

    /**
     * @param {IRequest} request
     * @returns {Object}
     */
    fromRequest(request: IRequest): Object {

        const imagePath = 'uploads/' + request.user.id + '/' + request.file.filename;

        return {
            message: 'Image has been uploaded successfully.',
            imagePath: imagePath,
            imageFullPath: request.protocol + '://' + request.get('host') + '/' + imagePath
        }
    }
}