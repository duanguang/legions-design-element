/*
 * @Author: linzeqin
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:13:20
 * @LastEditors: linzeqin
 * @Description: 词云
 */
import 'echarts-wordcloud';
import { merge } from 'lodash';
import React from 'react';
import { mainColorList } from '../core';
import { LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';

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
