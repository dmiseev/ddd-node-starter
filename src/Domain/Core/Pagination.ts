import { IRequest } from '../../Utils/Request/custom';

export class Pagination {

    private _page: number;
    private _perPage: number;

    constructor(page: number, perPage: number)
    {
        this._page = page;
        this._perPage = perPage;
    }

    /**
     * @param {IRequest} request
     * @returns {Pagination}
     */
    public static fromRequest(request: IRequest): Pagination
    {
        return new Pagination(
            request.query.page ? Number(request.query.page) : 1,
            request.query.perPage ? Number(request.query.perPage) : 10
        );
    }

    public page(): number {
        return this._page;
    }

    public perPage(): number {
        return this._perPage;
    }

    /**
     * @returns {number}
     */
    public offset(): number {
        return (this.page() - 1) * this.perPage();
    }
}