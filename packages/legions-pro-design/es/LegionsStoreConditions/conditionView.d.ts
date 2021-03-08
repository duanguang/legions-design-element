import { IObservableMap, ISelectAutoQuery, ISelectOptions } from './interface';
import { IProConditions } from '../LegionsProConditions/ProConditionsUtils';
export declare class ConditionView<Query = {}> {
    constructor(uid?: string);
    private uid;
    /**
     * 查询条件
     *
     * @type {Object}
     * @memberof ConditionView
     */
    private query;
    /**
     *
     * 转换成接口所需数据
     * @type {Query}
     * @memberof ConditionView
     */
    tranQuery: Query;
    /**
     * 组件在 dom 树的真实高度
     * 自动获取的
     *  请勿组件外部不要修改这个值
     *
     * @type {number}
     * @memberof HlQueryConditionView
     */
    domHeight: number;
    /**
     *
     * 容器宽度
     * @type {number}
     * @memberof ConditionView
     */
    widthContainer: number;
    /**
     *
     * 搜索条件组件数据模型
     * @private
     * @type {Object}
     * @memberof ConditionView
     */
    private vmModel;
    private size;
    selectOptions: IObservableMap<string, ISelectOptions>;
    get computedQuery(): Array<IProConditions['componentModel']>;
    get computedVmModel(): any;
    get computedSize(): "default" | "small";
    /**
     * xs: 宽度<768px 响应式栅格，可为栅格数或一个包含其他属性的对象
     *
     * sm:宽度≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象
     *
     * md: 宽度≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象
     *
     * lg: 宽度≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象
     *
     * xl:宽度≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象
     */
    get compuedResolution(): 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    /**
     *  更新数据模型
     *
     * @param {Object} model
     * @memberof HlQueryConditionView
     */
    _setVmModel(model: Object): void;
    _clearQuery(): void;
    _firstInitQuery(query: Array<IProConditions['componentModel']>): void;
    _initQuery(query: Array<IProConditions['componentModel']>, options?: {
        isCache: boolean;
    }): void;
    /** 改变搜索条件配置数据 */
    _setQueryState<T extends IProConditions['componentModel']>(name: string, callback: (value: T) => void): void;
    private _getQueryItem;
    _setSize(size: 'small' | 'default'): void;
    _dispatchRequest(name: string, autoQuery: ISelectAutoQuery, options?: {
        pageIndex: number;
        pageSize?: number;
        keyWords?: string;
        /** 接口请求完成触发 */
        callback?: (value: any) => void;
    }): void;
}
