/*
 * @Author: duanguang
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:12:50
 * @LastEditors: duanguang
 * @Description: 饼图组件
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsChartCard/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import { LegionsEchartsAutoQueryParams, LegionsProEchartsPropsTypes } from '../interface';
import echarts from 'echarts/lib/echarts';

export class LegionsProEchartsCardProps{
    title?: string = '';
    total?: number = 0;
}
/** 卡片组件 */
export default class LegionsProEchartsChartCard extends React.Component<LegionsProEchartsCardProps>{
    static defaultProps: Readonly<LegionsProEchartsCardProps> = new LegionsProEchartsCardProps()
    componentDidMount() {
    }
    render() {
        const { title,total } = this.props;
        return ( <div
                style={{
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <div>
                    <div
                        style={{
                            fontSize: '30px',
                            fontFamily: ' PingFangSC, PingFangSC-Regular',
                            fontWeight: 400,
                            textAlign: 'center',
                            color: '#00e6fc',
                            lineHeight: '32px',
                        }}>
                        {total}
                    </div>
                    <div
                        style={{
                            fontSize: '14px',
                            fontFamily: 'PingFangSC, PingFangSC-Regular',
                            fontWeight: 400,
                            textAlign: 'center',
                            color: '#9be7f5',
                            lineHeight: '20px',
                        }}>
                        {title}
                    </div>
                </div>
            </div>
        )
    }
}
