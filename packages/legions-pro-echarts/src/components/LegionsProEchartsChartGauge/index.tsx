/*
 * @Author: linzeqin
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:13:20
 * @LastEditors: linzeqin
 * @Description: 仪表盘
 */
import { GaugeChart, GaugeSeriesOption } from 'echarts/charts';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';
echarts.use([GaugeChart])

export class LegionsProEchartsGaugeProps extends LegionsProEchartsPropsTypes<GaugeSeriesOption> {

}

/** 仪表盘组件 */
export default class LegionsProEchartsChartGauge extends React.PureComponent<LegionsProEchartsGaugeProps>{
    static defaultProps: Readonly<LegionsProEchartsGaugeProps> = new LegionsProEchartsGaugeProps()

    /** 配置项 */
    get option(): LegionsProEchartsOption<GaugeSeriesOption> {
        return {
            tooltip: {
                trigger: 'item',
            },
            series: [
                {
                    type: 'gauge',
                    title: {
                        color: '#fff',
                    },
                    detail: {
                        color: '#fff',
                    },
                    itemStyle: {
                        color: '#00d4fd',
                        shadowColor: 'rgba(0,138,255,0.45)',
                        shadowBlur: 10,
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    },
                    progress: {
                        show: true,
                        roundCap: true,
                        width: 10
                    },
                    axisTick: {
                        splitNumber: 5,
                        lineStyle: {
                            width: 2,
                            color: 'rgba(20,105,131,1)'
                        }
                    },
                    splitLine: {
                        length: 12,
                        lineStyle: {
                            width: 2,
                            color: 'rgba(20,105,131,1)'
                        }
                    },
                    axisLabel: {
                        distance: 15,
                        color: '#fff',
                        fontSize: 14
                    },
                    axisLine: {
                        lineStyle: {
                            color: [
                                [1, 'rgba(6,41,70,0.8)']
                            ],
                        },
                        roundCap: true,
                    },
                },
            ],
        };
    }
    render() {
        const option = merge(this.option, this.props.option)
        return (
            <LegionsProEcharts<GaugeSeriesOption>
                {...this.props}
                option={option}
            ></LegionsProEcharts>
        )
    }
}
