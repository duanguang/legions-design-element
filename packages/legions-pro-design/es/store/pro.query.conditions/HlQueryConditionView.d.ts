import { IObservableMap, ISelectAutoQuery, ISelectOptions } from './interface';
export declare class HlQueryConditionView<Query = {}> {
    /**
     * 查询条件
     *
     * @type {Object}
     * @memberof HlQueryConditionView
     */
    private query;
    /**
     *
     * 转换成接口所需数据
     * @type {Query}
     * @memberof HlQueryConditionView
     */
    tranQuery: Query;
    /**
     *
     * 搜索条件左侧组件集合
     * @private
     * @type {React.ReactNode[]}
     * @memberof HlQueryConditionView
     */
    private queryLeftComponent;
    /**
     * 搜索条件右侧组件集合
     *
     * @private
     * @type {React.ReactNode[]}
     * @memberof HlQueryConditionView
     */
    private queryRightComponent;
    /**
     * 动态排版区域组件
     *
     * @private
     * @type {JSX.Element}
     * @memberof HlQueryConditionView
     */
    private queryContentComponent;
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
     * @memberof HlQueryConditionView
     */
    widthContainer: number;
    /**
     *
     * 搜索条件组件数据模型
     * @private
     * @type {Object}
     * @memberof HlQueryConditionView
     */
    private vmModel;
    private size;
    selectOptions: IObservableMap<string, ISelectOptions>;
    get computedQuery(): Query;
    get computedVmModel(): any;
    /**
     * 搜索条件右侧组件集合
     *
     * @readonly
     * @memberof HlQueryConditionView
     */
    get computedLeftComponent(): JSX.Element;
    /**
     * 动态排布区域组件
     *
     * @readonly
     * @memberof HlQueryConditionView
     */
    get computedContentComponent(): JSX.Element;
    /**
     *
     * 搜索左侧组件集合
     * @readonly
     * @memberof HlQueryConditionView
     */
    get computedRightComponent(): JSX.Element;
    get computedSize(): "default" | "small";
    /**
     *  更新数据模型
     *
     * @param {Object} model
     * @memberof HlQueryConditionView
     */
    setVmModel(model: Object): void;
    setLeftComponent(left?: JSX.Element): void;
    setRightComponent(right?: JSX.Element): void;
    setContentComponent(content?: JSX.Element): void;
    setQuery(query: Query): void;
    setSize(size: 'small' | 'default'): void;
    dispatchRequest(name: string, autoQuery: ISelectAutoQuery, options?: {
        pageIndex: number;
        pageSize?: number;
        keyWords?: string;
    }): void;
}
