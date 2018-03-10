import { Request } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import * as multer from 'multer';
import { authMiddleware, loggerMiddleware } from '../Middleware/CustomMiddleware';

@controller('/uploads', loggerMiddleware, authMiddleware)
export class UploadController {

    /**
     * @param {Request} request
     */
    @httpPost('/', multer({
        dest: __dirname + '../../../../public/uploads/',
        filename: (req, file, cb) => {
            cb(null, file.fieldname + '-' + Date.now());
        }
    }).single('image'))
    public async upload(request) {


        // TODO: continue late

        console.log(request.file);

        return {filePath: '22'};
    }
}