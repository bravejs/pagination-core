export interface Options {
    current: number;
    total: number;
    pageSize: number;
    maxLength: number;
}
export interface Props extends Options {
    totalPages: number;
}
export declare type Pages = number[];
export declare type Callback = (pages: Pages, props: Props) => void;
declare class PaginationCore {
    props: Props;
    pages: Pages;
    private _cb?;
    constructor(options: Partial<Options>, callback?: Callback);
    prev(): void;
    next(): void;
    to(page: number): void;
    set(options: Partial<Options>): void;
    private _init;
}
export default PaginationCore;
