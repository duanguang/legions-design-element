/*
 * @Author: linzeqin
 * @Date: 2021-01-22 14:23:11
 * @description: 词云
 */
import LegionsProEcharts from '../LegionsProEcharts';
import 'echarts-wordcloud';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
import { mainColorList } from '../core';

export class LegionsProEchartsWordCloudProps extends LegionsProEchartsPropsTypes<any> {
    /** 数据 */
    data?: Object;
}
export default class LegionsProEchartsWordCloud extends React.Component<LegionsProEchartsWordCloudProps>{
    static defaultProps: Readonly<LegionsProEchartsWordCloudProps> = new LegionsProEchartsWordCloudProps()

    /** 配置项 */
    get option(): LegionsProEchartsOption {
        return {
            series: [
                {
                    type: 'wordCloud',
                    sizeRange: [6, 20],
                    rotationRange: [ -90, 90],
                    textPadding: 0,
                    gridSize: 5,
                    left: 'center',
                    top: 'center',
                    drawOutOfBound: false,
                    textStyle: {
                        color: (e) => {
                            return mainColorList[e.dataIndex % mainColorList.length]
                        }
                    },
                    data: this.props.data || []
                },
            ],
        }
    }
    render() {
        const option = merge(this.option, this.props.option)
        return (
            <LegionsProEcharts
                {...this.props}
                option={option}
            ></LegionsProEcharts>
        )
    }
}
