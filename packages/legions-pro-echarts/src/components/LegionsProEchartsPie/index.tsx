/*
 * @Author: duanguang
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:13:20
 * @LastEditors: duanguang
 * @Description: 饼图组件
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsPie/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { PieChart, PieSeriesOption } from 'echarts/charts';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';
echarts.use([PieChart])

export class LegionsProEchartsPieProps extends LegionsProEchartsPropsTypes<PieSeriesOption> {
    /** 数据 */
    data?: PieSeriesOption['data'];
}


/** 饼图组件 */
export default class LegionsProEchartsPie extends React.PureComponent<LegionsProEchartsPieProps>{
    static defaultProps: Readonly<LegionsProEchartsPieProps> = new LegionsProEchartsPieProps()

    /** 配置项 */
    get option(): LegionsProEchartsOption<PieSeriesOption> {
        return {
            tooltip: {
                trigger: 'item',
                formatter: '{b} : {c} ({d}%)',
            },
            legend: {
                bottom: 20,
                itemWidth: 10,
                itemHeight: 4,
            },
            series: [
                {
                    type: 'pie',
                    radius: '40%',
                    center: ['50%', '40%'],
                    itemStyle: {
                        borderRadius: 0,
                        borderColor: 'rgba(12,13,41,0.4)',
                        borderWidth: 2
                    },
                    selectedOffset: 1.5,
                    data: this.props.data || [],
                    label: {
                        show: true,
                        formatter: '{b}\n{d}%',
                    },
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
            ],
        };
    }
    render() {
        const option = merge(this.option, this.props.option)
        return (
            <LegionsProEcharts<PieSeriesOption>
                {...this.props}
                option={option}
            ></LegionsProEcharts>
        )
    }
}
