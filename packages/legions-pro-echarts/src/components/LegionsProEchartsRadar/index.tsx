/*
 * @Author: linzeqin
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:13:20
 * @LastEditors: linzeqin
 * @Description: 雷达图
 */
import { RadarChart, RadarSeriesOption } from 'echarts/charts';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';
echarts.use([RadarChart])

export class LegionsProEchartsRadarProps extends LegionsProEchartsPropsTypes<RadarSeriesOption> {

}

/** 雷达组件 */
export default class LegionsProEchartsRadar extends React.PureComponent<LegionsProEchartsRadarProps>{
    static defaultProps: Readonly<LegionsProEchartsRadarProps> = new LegionsProEchartsRadarProps()

    /** 配置项 */
    get option(): LegionsProEchartsOption<RadarSeriesOption> {
        return {
            tooltip: {
                trigger: 'item',
            },
            legend: {
                bottom: 20,
                itemWidth: 10,
                itemHeight: 4,
            },
            radar: {
                center: ['50%', '40%'],
                radius: 80,
            },
            series: [
                {
                    type: 'radar',
                },
            ],
        };
    }
    render() {
        const option = merge(this.option, this.props.option)
        return (
            <LegionsProEcharts<RadarSeriesOption>
                {...this.props}
                option={option}
            ></LegionsProEcharts>
        )
    }
}
