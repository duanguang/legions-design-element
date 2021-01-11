import { observablePromise } from 'legions/store-utils';
import { ITableAutoQuery } from './interface';
export declare class ProTableLocalView {
    /**
     *
     * 表格接口数据
     * @memberof HLTableLocalView
     */
    obState: observablePromise.PramsResult<any>;
    loading: boolean;
    dispatchRequest(autoQuery: ITableAutoQuery, options: {
        pageIndex: number;
        pageSize: number;
    }): void;
}
