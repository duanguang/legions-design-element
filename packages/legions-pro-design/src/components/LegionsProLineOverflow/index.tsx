/*
 * @Author: duanguang
 * @Date: 2021-01-04 16:30:32
 * @LastEditTime: 2021-02-22 15:37:53
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProLineOverflow/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React,{ Component } from 'react';
import styles from './style/index.modules.less';
import { Tooltip } from 'antd';
interface IProps {
    width?: number | string,
    text: string | React.ReactNode,
}
export default class LegionsProLineOverflow extends Component<IProps> {
    static defaultProps: IProps = {
        text: '',
        width: 100,
    };
    render() {
        return (
            <Tooltip placement="leftTop" title={this.props.text ? this.props.text : ''}>
                <div className={styles.hlTableCell} >
                    <div className={styles.hlTableTooltipRel} >
                        <span className={styles.hlTableCellTooltipContent} >
                            {this.props.text}
                        </span>
                    </div>
                </div>
            </Tooltip>
        )
    }
}
