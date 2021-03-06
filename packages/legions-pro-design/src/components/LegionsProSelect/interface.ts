/*
 * @Author: duanguang
 * @Date: 2020-12-26 22:43:04
 * @LastEditTime: 2021-02-23 16:00:00
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProSelect/interface.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { SelectProps,OptionProps } from '../interface/antd';
import { Weaken } from '../interface';
import { SelectValue } from 'antd/lib/select';
export interface IProSelectProps extends SelectProps,Weaken<SelectProps,'onSearch' | 'onChange'> {

    /**
     * 总数
     *
     * @type {number}
     * @memberof IHLSelectProps
     */
    total?: number;

    /**
     *传入此函数 会在启用分页和远程搜索时执行切换页码时调用
     *
     * @memberof IHLSelectProps
     */
    onPagingQuery?: (pageIndex: number,pageSize: number,value?: string | string[] | number[] | LabeledValue | LabeledValue[]) => void
    options: IOptions[];
    optGroups?: Array<IOptGroupProps>
    loading?: boolean,

    /**
     * 最多显示多少个 tag 默认80000
     *
     * @type {number}
     * @memberof IHLSelectProps
     */
    maxTagCount?: number,

    /**
     * 组件加载时，抛回下拉组件生成的唯一uid
     *
     * @memberof IHLSelectProps
     */
    onReady?: (uid: string) => void,


    /**
     *
     * 是否默认展开下拉菜单 默认不展开
     * @type {boolean}
     * @memberof IHLSelectProps
     */
    defaultOpen?: boolean;

    /**
     * 是否展开下拉菜单
     *
     * @type {boolean}
     * @memberof IHLSelectProps
     */
    open?: boolean;


    /**
     * 是否启动分页
     *
     * @type {boolean}
     * @memberof IHLSelectProps
     */
    paging?: boolean;

    /**
     * 是否使用远程搜索 默认false
     * 如果启用远程搜索才会触发方法
     * @type {boolean}
     * @memberof IHLSelectProps
     */
    remote?: boolean;

    /**
     * 在开启远程搜索触发
     * 没有开启分页或者开启远程搜索时，才触发上层onSearch
     * @memberof IHLSelectProps
     */
    onSearch?: (value: string) => any;


    /**
     *  清除选中数据时触发，主要是单选和combobox模式触发
     *
     * @memberof IHLSelectProps
     */
    onClear?: () => void

    pageSize?: number;
    /**
     * packingValue 详细的选中数据
     *
     * @memberof IHLSelectProps
     */
    onChange?: (value: SelectValue,packingValue?: LabeledValue[] | LabeledValue) => void;

    /**
     * 全选样式，表单select 内部组件使用
     *
     * @type {string}
     * @memberof IHLSelectProps
     */
    selectAllClass?: string;
}

export interface IOptGroupProps {
    label: string | JSX.Element;
    key?: string;
}

export interface LabeledValue {
    key: string | number;
    label: React.ReactNode;
    title?: number | string;
    extendedField: string,
    value: string;
}
export interface IOptions extends OptionProps { 
    value: string,
    key: string,
    /**
     *
     * 扩展字段，上层传入，选中时直接输出
     * @type {string}
     * @memberof ISelectProps
     */
    extendedField?: string;
    /**
    * 分组信息
    *
    * @type {(string|number)}
    * @memberof IAntdSelectOption
    */
    groupKey?: string | number;
}