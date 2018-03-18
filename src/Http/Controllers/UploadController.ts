import { controller, httpPost } from 'inversify-express-utils';
import { inject } from 'inversify';
import { IUploadService } from '../../Domain/Core/IUploadService';
import * as multer from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import * as uuidv4 from 'uuid/v4';
import { authMiddleware } from '../Middleware/CustomMiddleware';
import { IRequest } from '../../Utils/Request/custom';

@controller('/uploads', authMiddleware)
export class UploadController {

    constructor(@inject('IUploadService') private uploadService: IUploadService) {
    }

    /**
     * TODO: need think about refactoring :)
     * @param {IRequest} request
     */
    @httpPost('/', multer({

        storage: multer.diskStorage({

            destination: (req: IRequest, file, callback) => {
                let folderPath = path.resolve('./public/uploads/' + req.user.id + '/');

                if (!fs.existsSync(folderPath)) {
                    fs.mkdirSync(folderPath);
                }

                callback(null, folderPath);
            },

            filename: function (req, file, callback) {
                callback(null, uuidv4() + '.' + file.mimetype.split('/')[1]);
            }
        }),

        fileFilter: (req, file, callback) => {

            if (!file) {
                return callback(new Error('Could not upload image.'), false);
            }

            if (!file.mimetype.startsWith('image/') || !file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
                return callback(new Error('Could not upload image. The file does not match the type: jpeg, png, gif.'), false);
            }

            callback(null, true);
        }
    }).single('image'))
    public async upload(request: IRequest) {

        return this.uploadService.fromRequest(request);
    }
}