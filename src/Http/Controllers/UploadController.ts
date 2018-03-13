import { Request } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import * as multer from 'multer';
import { authMiddleware, loggerMiddleware } from '../Middleware/CustomMiddleware';
import { inject } from 'inversify';
import { IUploadService } from '../../Domain/Core/IUploadService';

@controller('/uploads', loggerMiddleware, authMiddleware)
export class UploadController {

    constructor(@inject('IUploadService') private uploadService: IUploadService) {
    }

    /**
     * @param {Request} request
     */
    @httpPost('/', multer({
        dest: __dirname + '../../../../public/uploads/',
        filename: (req, file, callback) => {
            callback(null, file.fieldname + '-' + Date.now());
        }
    }).single('image'))
    public async upload(request) {

        return this.uploadService.fromRequest(request);
    }
}