export interface Options {
    current: number;
    total: number;
    pageSize: number;
    maxLength: number;
}
export interface Props extends Options {
    totalPages: number;
}
declare class Pagination {
    pages: number[];
    props: Props;
    constructor(options: Partial<Options>);
    prev(): void;
    next(): void;
    to(page: number): void;
    set(options: Partial<Options>): void;
    private _init;
}
export default Pagination;
