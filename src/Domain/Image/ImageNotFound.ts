
export class ImageNotFound extends Error{

    /**
     * @param {number} id
     * @returns {ImageNotFound}
     */
    static fromId(id: number): ImageNotFound
    {
        return new ImageNotFound('Image with ID #' + id + ' not found.')
    }
}