export interface Options {
    current: number;
    total: number;
    pageSize: number;
    maxLength: number;
}
export interface Props extends Options {
    totalPages: number;
}
export declare type Callback = (pages: number[], props: Props) => void;
declare class Pagination {
    pages: number[];
    props: Props;
    private _cb?;
    constructor(options: Partial<Options>, callback?: Callback);
    prev(): void;
    next(): void;
    to(page: number): void;
    set(options: Partial<Options>): void;
    private _init;
}
export default Pagination;
