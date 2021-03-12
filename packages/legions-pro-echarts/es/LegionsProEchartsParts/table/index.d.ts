import { ColumnProps } from 'antd/lib/table/Column';
import { TableProps } from 'antd/lib/table/Table';
import { TooltipPlacement } from 'antd/lib/tooltip';
import React from 'react';
import '../style/table.less';
export interface LegionsProEchartsTableColumnProps<T = {}> extends ColumnProps<T> {
    /** 是否超出隐藏并显示省略号 */
    tooltip?: TooltipPlacement;
    /** 列表对齐方式 */
    textAlign?: 'left' | 'right' | 'center';
}
interface IProps<T> extends TableProps<T> {
    /** 表格列定义类型覆盖 */
    columns?: LegionsProEchartsTableColumnProps<T>[];
    /** 是否启用高度自适应模式 */
    isFullScreen?: boolean;
}
export default class LegionsProEchartsTable<T> extends React.Component<IProps<T>> {
    ref: any;
    /** 列配置劫持处理，添加tooltip和超出隐藏显示省略号功能 */
    private columnsFactory;
    render(): JSX.Element;
}
export {};
