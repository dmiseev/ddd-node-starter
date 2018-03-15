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

        console.log(request.file);

        // TODO: need finish

        return {
            imagePath: request.get('host') + '/uploads/' + request.file.filename + '.jpeg'
        }
    }
}