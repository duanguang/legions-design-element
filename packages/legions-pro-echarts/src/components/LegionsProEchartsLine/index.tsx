/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: 折线图
 */
import { LineChart, LineSeriesOption } from 'echarts/charts';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';

echarts.use([LineChart])
export class LegionsProEchartsLineProps extends LegionsProEchartsPropsTypes<LineSeriesOption> {

}

export default class LegionsProEchartsLine extends React.Component<LegionsProEchartsLineProps>{
    static defaultProps: Readonly<LegionsProEchartsLineProps> = new LegionsProEchartsLineProps()

    /** 配置项 */
    get option(): LegionsProEchartsOption<LineSeriesOption> {
        return  {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                padding:15,
                itemWidth:13,
                itemHeight:5,
            },
            grid: {
                top:'20%',
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true,
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine:{
                    lineStyle:{
                        type:'dashed',
                        color:'#0C4354',
                    },
                },
                axisLabel:{
                    color:'#6A94AC',
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
            series: [
                {
                    type: 'line',
                }
            ],
        };
    }
    render() {
        const option = merge(this.option, this.props.option)
        return(
            <LegionsProEcharts<LineSeriesOption>
                {...this.props}
                option={merge(this.option, option)}
            ></LegionsProEcharts>
        )
    }
}

