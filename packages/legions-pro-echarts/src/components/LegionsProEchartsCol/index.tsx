import React from 'react';
import { Col } from 'antd';
import {ColProps,ColSize} from 'antd/lib/grid/col'
import { Weaken } from '../interface/interface';
interface ILegionsProEchartsColProps extends Weaken<ColProps,'xs'|'sm'>, ColProps{
    /** 栅格占位格数，为 0 时相当于 display: none */
    span?: number;
    /**栅格顺序，flex 布局模式下有效 */
    order?: number;
    /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
    offset?: number;
    /** 栅格向右移动格数 */
    push?: number;
    /** 栅格向左移动格数 */
    pull?: number;
    /** 宽度<768px 响应式栅格，可为栅格数或一个包含其他属性的对象  */
    xs: number | ColSize;
    /** 宽度≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    sm: number | ColSize;
    /** 宽度≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    md: number | ColSize;
    /** 宽度≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    lg: number | ColSize;
    /** 宽度≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
    xl: number | ColSize;
    children?: any;
}
export const LegionsProEchartsCol = (props:ILegionsProEchartsColProps) => {
    return <Col {...props}>{props.children}</Col>
}