import { Request } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { authMiddleware, loggerMiddleware } from '../Middleware/CustomMiddleware';
import { inject } from 'inversify';
import { IUploadService } from '../../Domain/Core/IUploadService';
import * as multer from 'multer';

@controller('/uploads', loggerMiddleware, authMiddleware)
export class UploadController {

    private config;

    constructor(@inject('IUploadService') private uploadService: IUploadService) {
        this.config = {

            storage: multer.diskStorage({

                destination: (req, file, callback) => {
                    callback(null, '../../../../public/uploads/');
                },

                filename: function (req, file, callback) {
                    callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
                }
            }),

            fileFilter: (req, file, callback) => {

                if (!file) callback();

                if (!file.mimetype.startsWith('image/') || !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                    return callback(new Error('Could not upload image. The file does not match the type: jpeg, png, gif.'), false);
                }

                callback(null, true);
            }
        };
    }

    /**
     * @param {Request} request
     */
    @httpPost('/', multer(this.config).single('image'))
    public async upload(request) {

        return this.uploadService.fromRequest(request);
    }
}