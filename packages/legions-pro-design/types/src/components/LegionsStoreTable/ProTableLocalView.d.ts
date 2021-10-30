import { ITableAutoQuery } from './interface';
import { PageListEntity } from './pageListEntity';
export declare class ProTableLocalView {
    /**
     *
     * 表格接口数据
     * @memberof ProTableLocalView
     */
    obState: import("legions/store-utils").ObservablePromiseModel<PageListEntity<any>>;
    _obStateMap: import("mobx").ObservableMap<string, {
        data: any[];
        total: number;
    }>;
    /** 查询数据状态
     *
     * 在loading动画展示时使用
     */
    private _loading;
    /** http 请求状态 */
    private _request;
    /** 数据请求状态 */
    get computedLoading(): boolean;
    /** http 请求状态 */
    get computedRequest(): "none" | "pending" | "complete";
    /** 更新动画状态,组件内部私有方法 */
    _setLoadingState(_loading: boolean): void;
    /** 更新http请求接口状态,组件内部私有方法  */
    _setRequestState(request: 'none' | 'pending' | 'complete'): void;
    dispatchRequest(autoQuery: ITableAutoQuery, options: {
        pageIndex: number;
        pageSize: number;
        isShowLoading: boolean;
    }): void;
}
