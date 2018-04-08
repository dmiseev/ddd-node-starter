import { EntityNotFound } from '../Core/EntityNotFound';

export class ImageNotFound extends EntityNotFound {

    /**
     * @param {number} id
     * @returns {ImageNotFound}
     */
    static fromId(id: number): ImageNotFound {
        return new ImageNotFound('Image with ID #' + id + ' not found.');
    }
}