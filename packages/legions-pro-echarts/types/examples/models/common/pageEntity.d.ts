import { BaseEntity } from './baseEntity';
export interface IPageEntity<T> {
    total: number;
    rows: Array<T>;
    pageSize: number;
    page: number;
    records: number;
}
export declare class PageEntity<P> extends BaseEntity<IPageEntity<P>> {
    result: IPageEntity<P>;
    constructor(fromJson: any, entity?: any);
}
