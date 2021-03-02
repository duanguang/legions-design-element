/*
 * @Author: linzeqin
 * @Date: 2019-11-07 08:36:35
 * @description: 列表组件
 */

import { Table } from 'antd';
import { TableProps } from 'antd/lib/table/Table';
import React from 'react';
import { prefixCls } from '../../core';
import '../style/table.less';

interface IProps<T> extends TableProps<T> {
    /** 是否启用高度自适应模式 */
    isFullScreen?: boolean
}
export default class LegionsProEchartsTable<T> extends React.Component<IProps<T>> {
    render() {
        const {className,isFullScreen, ...props} = this.props;
        const full = isFullScreen ? `${prefixCls}-table-full` : '';
        return (
            <Table<T>
                size="middle"
                {...props}
                className={`${prefixCls}-table ${full} ${className ? className : ''}`}
            ></Table>
        )
    }
}
