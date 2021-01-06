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
                {/* <span className={styles.hlLineOverflow} style={{ width: `${this.props.width}px` }}>
          {this.props.text}
        </span> */}
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
