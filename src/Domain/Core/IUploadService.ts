import { IRequest } from '../../Utils/Request/custom';

export interface IUploadService {

    /**
     * @param {IRequest} request
     * @returns {Object}
     */
    fromRequest(request: IRequest): Object;
}