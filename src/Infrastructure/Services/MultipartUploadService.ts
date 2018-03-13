import { injectable } from 'inversify';
import { IUploadService } from '../../Domain/Core/IUploadService';

@injectable()
export class MultipartUploadService implements IUploadService{

    /**
     * @param {Request} request
     * @returns {Object}
     */
    fromRequest(request): Object {

        if (!request.file) {
            throw new Error('Could not upload image.');
        }

        if (request.file.mimetype !== 'image/jpeg'
            && request.file.mimetype !== 'image/png'
            && request.file.mimetype !== 'image/gif')
        {
            throw new Error('Could not upload image. The file does not match the type: jpeg, png, gif.');
        }

        // TODO: need finish

        return {
            imagePath: request.get('host') + '/uploads/' + request.file.filename + '.jpeg'
        }
    }
}