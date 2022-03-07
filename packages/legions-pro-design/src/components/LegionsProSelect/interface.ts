/*
 * @Author: duanguang
 * @Date: 2020-12-26 22:43:04
 * @LastEditTime: 2022-03-07 15:18:50
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
     */
    total?: number;

    /**
     *传入此函数 会在启用分页和远程搜索时执行切换页码时调用
     *
     */
    onPagingQuery?: (pageIndex: number,pageSize: number,value?: string | string[] | number[] | LabeledValue | LabeledValue[]) => void
    options: IOptions[];
    optGroups?: Array<IOptGroupProps>
    loading?: boolean,

    /**
     * 最多显示多少个 tag 默认80000
     *
     * @type {number}
     */
    maxTagCount?: number,

    /**
     * 组件加载时，抛回下拉组件生成的唯一uid
     *
     */
    onReady?: (uid: string) => void,


    /**
     *
     * 是否默认展开下拉菜单 默认不展开
     * @type {boolean}
     */
    defaultOpen?: boolean;

    /**
     * 是否展开下拉菜单
     *
     * @type {boolean}
     */
    open?: boolean;


    /**
     * 是否启动分页
     *
     * @type {boolean}
     */
    paging?: boolean;

    /**
     * 在开启远程搜索触发
     * 没有开启分页或者开启远程搜索时，才触发上层onSearch
     */
    onSearch?: (value: string) => any;


    /**
     *  清除选中数据时触发，主要是单选和combobox模式触发
     *
     */
    onClear?: () => void

    pageSize?: number;
    /**
     * packingValue 详细的选中数据
     *
     */
    onChange?: (value: SelectValue,packingValue?: LabeledValue[] | LabeledValue) => void;

    /**
     * 全选样式，表单select 内部组件使用
     *
     * @type {string}
     */
    selectAllClass?: string;
}
export interface ProSelect{
    labeledValue: LabeledValue;
    options: IOptions;
}
export interface IOptGroupProps {
    label: string | JSX.Element;
    key?: string;
}

export interface LabeledValue {
    /**和 value 含义一致。如果 React 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 */
    key: string;
    label: React.ReactNode;
    title?: number | string;
    value: any;
    extendedField?:any
}
export interface IOptions extends OptionProps { 
    /** 和 value 含义一致。如果 React 需要你设置此项，此项值与 value 的值相同，然后可以省略 value 设置 */
    key?: string;
    label: string;
    group_key?: string;
    value: any;
    /** 扩展字段，如果下拉数据项还需要保存其他数据时，可使用此选项 */
    extendedField?:any
}