/*
 * @Author: linzeqin
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:13:20
 * @LastEditors: linzeqin
 * @Description: 柱状图
 */
import { BarChart, BarSeriesOption } from 'echarts/charts';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';

echarts.use([BarChart])

export class LegionsProEchartsBarProps extends LegionsProEchartsPropsTypes<BarSeriesOption> {
    /** 数据 */
    data?: BarSeriesOption['data'];
}

export default class LegionsProEchartsBar extends React.Component<LegionsProEchartsBarProps>{
    static defaultProps: Readonly<LegionsProEchartsBarProps> = new LegionsProEchartsBarProps()

    /** 配置项 */
    get option(): LegionsProEchartsOption<BarSeriesOption> {
        return {
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
