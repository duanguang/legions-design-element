/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 列表组件
 */

import { Table, Tooltip } from 'antd';
import { ColumnProps } from 'antd/lib/table/Column';
import { TableProps } from 'antd/lib/table/Table';
import { TooltipPlacement } from 'antd/lib/tooltip';
import { get } from 'lodash';
import React from 'react';
import { prefixCls } from '../../core';
import '../style/table.less';

export interface LegionsProEchartsTableColumnProps<T={}> extends ColumnProps<T> {
    /** 是否超出隐藏并显示省略号 */
    tooltip?: TooltipPlacement;
    /** 列表对齐方式 */
    textAlign?: 'left' | 'right' | 'center';
}

interface IProps<T> extends TableProps<T> {
    /** 表格列定义类型覆盖 */
    columns?: LegionsProEchartsTableColumnProps<T>[]
    /** 是否启用高度自适应模式 */
    isFullScreen?: boolean
}
export default class LegionsProEchartsTable<T> extends React.Component<IProps<T>> {
    ref: any = null;
    /** 列配置劫持处理，添加tooltip和超出隐藏显示省略号功能 */
    private columnsFactory = (columns: LegionsProEchartsTableColumnProps<T>[]) => {
        return columns.map((item) => {
            let { tooltip, textAlign, render} = item;
            if (textAlign) {
                item.className = `${prefixCls}-table-align-${textAlign} ${item.className || ''}`
            }
            if (tooltip) {
                item.className = `${prefixCls}-table-tooltip ${item.className || ''}`
                item.render = (text, record, index) => {
                    const value = render ? render(text, record, index) : get(record, item.dataIndex)
                    return <Tooltip placement={tooltip} title={value}>{value}</Tooltip>
                }
                return item
            }
            return item
        })
    }
    render() {
        const {className = '', columns=[], isFullScreen, ...props} = this.props;
        const full = isFullScreen ? `${prefixCls}-table-full` : '';
        const pagination = props.pagination ? `${prefixCls}-table-pagination` : '';
        return (
            <Table<T>
                ref={(ref) => {this.ref = ref}}
                size="middle"
                {...props}
                columns={this.columnsFactory(columns)}
                className={`${prefixCls}-table ${full} ${pagination} ${className}`}
            ></Table>
        )
    }
}
