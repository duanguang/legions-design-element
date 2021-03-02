import { observablePromise } from 'legions/store-utils';
import { ITableAutoQuery } from './interface';
import { PageListEntity } from '../../LegionsProTable/pageListEntity';
export declare class ProTableLocalView {
    /**
     *
     * 表格接口数据
     * @memberof HLTableLocalView
     */
    obState: observablePromise.PramsResult<PageListEntity<any>>;
    loading: boolean;
    dispatchRequest(autoQuery: ITableAutoQuery, options: {
        pageIndex: number;
        pageSize: number;
    }): void;
}
