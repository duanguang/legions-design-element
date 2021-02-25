/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: 柱状图
 */
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { observer } from 'legions/store-react';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';

echarts.use([BarChart])

export class LegionsProEchartsChartBarProps extends LegionsProEchartsPropsTypes<BarSeriesOption> {
    /** 数据 */
    data?: BarSeriesOption['data'];
}

@observer
export default class LegionsProEchartsChartBar extends React.Component<LegionsProEchartsChartBarProps>{
    static defaultProps: Readonly<LegionsProEchartsChartBarProps> = new LegionsProEchartsChartBarProps()

    /** 配置项 */
    get option(): LegionsProEchartsOption<BarSeriesOption> {
        const a: LegionsProEchartsOption<BarSeriesOption> = {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                top:'20%',
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true,
            },
            legend: {
                padding:15,
                itemWidth:13,
                itemHeight:5,
            },
            xAxis: {
                type: 'category',
                splitLine:{
                    lineStyle:{
                        type:'dashed',
                        color:'#0C4354',
                    },
                },
                show:true,
                axisLabel:{
                    color:'#6A94AC',
                },
                axisLine: {
                    lineStyle: {
                        color: '#6a94ac',
                    },
                },
            },
            yAxis: {
                type: 'value',
                splitLine:{
                    lineStyle:{
                        type:'dashed',
                        color:'#0C4354',
                    },
                },
                axisLabel:{
                    color:'#6A94AC',
                },
                show:true,
            },
            series: [{
                type: 'bar',
            }],
        };
        return a
    }
    render() {
        return(
            <LegionsProEcharts<BarSeriesOption>
                {...this.props}
                option={merge(this.option, this.props.option)}
            ></LegionsProEcharts>
        )
    }
}
