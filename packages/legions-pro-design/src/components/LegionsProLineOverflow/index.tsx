/*
 * @Author: duanguang
 * @Date: 2021-01-04 16:30:32
 * @LastEditTime: 2021-03-05 17:13:29
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProLineOverflow/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React,{ Component } from 'react';
import './style/index.less'
import { Tooltip } from 'antd';
interface IProps {
    width?: number | string,
    text: string | React.ReactNode,
}
const baseCls='legions-pro-lineoverflow'
export default class LegionsProLineOverflow extends Component<IProps> {
    static defaultProps: IProps = {
        text: '',
        width: 100,
    };
    render() {
        return (
            <Tooltip placement="leftTop" title={this.props.text ? this.props.text : ''}>
                <div className={baseCls} >
                    <div className="tooltip-rel" >
                        <span className="tooltip-content" >
                            {this.props.text}
                        </span>
                    </div>
                </div>
            </Tooltip>
        )
    }
}
