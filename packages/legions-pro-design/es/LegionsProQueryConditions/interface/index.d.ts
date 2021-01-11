import { ProQueryConditionStore } from '../../store/pro.query.conditions';
import { IViewQueryConditionStore } from '../../store/pro.query.conditions/interface';
import { HlLabeledValue } from 'legions-lunar/model';
export interface ISelectProps {
    value: string;
    key: string;
}
interface IMethods {
    /**
     * 重置搜索条件
     *
     * @memberof IMethods
     */
    reset: () => void;
    /**
     * 设置一组指定元素value值
     *
     * @memberof IMethods
     */
    setFieldsValue: (fieldsValues: {
        fieldName: string;
        value: any;
    }[]) => void;
    /** 设置指定元素显示隐藏 */
    setFieldState: (fieldsStates: {
        name: string;
        state: IFieldsState;
    }[]) => void;
    /** 查询指定下拉组件数据项 */
    getQuerySelectOption: (/** 下拉组件name值，对应container.component.JsonProperty.name */ name: string, /** 下拉选项key值*/ optionKey: string) => {
        readonly item: HlLabeledValue;
        readonly options: Array<ISelectProps>;
    };
    /** 指定下拉搜索函数
     * 主要用于下拉托管请求时，无法得到搜索函数 */
    onSelectSearch: (
    /** 下拉组件name值，对应container.component.JsonProperty.name */ name: string, params: {
        pageIndex: number;
        pageSize?: number;
        keyWords?: string;
    } & Object) => void;
}
export interface IQueryProps {
    width: number;
    span?: number;
    title?: string;
    maxlength?: string;
    placeholder?: string;
    /**
     *是否允许重置 TRUE 不重置
     *
     * @type {boolean}
     * @memberof IQueryProps
     */
    isNotReset?: boolean;
    /**
     *
     * 自定义重置方法,返回一个新值
     * @memberof IQueryProps
     */
    onReset?: <T extends {}>(fieldName: string, vlaue: T) => T;
    onPaste?: (event: any) => void;
}
export interface IFieldsState {
    /**
     *
     * 组件是否可见，一般用来控制组件显隐，默认值true 可见，false不可见
     * 注意此隐藏只是隐藏dom ，元素依然存在只是不可见
     * @type {Boolean}
     * @memberof IFieldsState
     */
    display?: boolean;
    visable?: boolean;
}
export interface IQueryConditionsInstance<Query = {}> {
    store: ProQueryConditionStore<Query>;
    readonly uid: string;
    /**
     * 当前table实现双向绑定的数据对象，可以直接修改其值，会实时响应到table组件
     *
     * @type {IViewModelHLTable}
     * @memberof InstanceHlTable
     */
    viewModel: IViewQueryConditionStore<Query>;
    /**
     * 暴露一些组件操作方法
     *
     * @memberof InstanceHlTable
     */
    methods?: IMethods;
}
export {};
