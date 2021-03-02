/*
 * @Author: duanguang
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:13:20
 * @LastEditors: duanguang
 * @Description: 饼图组件
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsChartPie/index.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { RadarChart, RadarSeriesOption } from 'echarts/charts';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';
echarts.use([RadarChart])

export class LegionsProEchartsRadarProps extends LegionsProEchartsPropsTypes<RadarSeriesOption> {

}

/** 饼图组件 */
export default class LegionsProEchartsChartRadar extends React.PureComponent<LegionsProEchartsRadarProps>{
    static defaultProps: Readonly<LegionsProEchartsRadarProps> = new LegionsProEchartsRadarProps()

    /** 配置项 */
    get option(): LegionsProEchartsOption<RadarSeriesOption> {
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
