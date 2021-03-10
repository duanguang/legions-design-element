/*
 * @Author: linzeqin
 * @Date: 2020-12-14 16:10:47
 * @LastEditTime: 2020-12-18 16:13:20
 * @LastEditors: linzeqin
 * @Description: 水滴波纹组件
 */
import 'echarts-liquidfill';
import { merge } from 'lodash';
import React from 'react';
import { echarts, LegionsProEchartsPropsTypes } from '../interface';
import LegionsProEcharts from '../LegionsProEcharts';
const { LinearGradient } = echarts.graphic;

export class LegionsProEchartsLiquidFillProps extends LegionsProEchartsPropsTypes<any> {
    /** 数据 */
    data?: Object;
}
export default class LegionsProEchartsLiquidFill extends React.Component<LegionsProEchartsLiquidFillProps>{
    static defaultProps: Readonly<LegionsProEchartsLiquidFillProps> = new LegionsProEchartsLiquidFillProps()

    /** 配置项 */
    private get option() {
        return {
            series: [
                {
                    type: 'liquidFill',
                    data: this.props.data || [],
                    radius: '80%',
                    center: ['50%', '50%'],
                    color: [new LinearGradient(0,0,0,1,[{
                        offset: 1,
                        color: 'rgba(58, 71, 212, 0)'
                    }, {
                        offset: 0.5,
                        color: 'rgba(31, 222, 225, .2)'
                    }, {
                        offset: 0,
                        color: 'rgba(31, 222, 225, 1)'
                    }],false)],
                    label: {
                        show: true,
                        color: '#aab2fa',
                        insideColor: '#fff',
                        fontSize: 24,
                        top:'68%',
                    },
                    outline: {
                        borderDistance: 0,
                        itemStyle: {
                            borderWidth: 8,
                            borderColor: new LinearGradient(0,0,0,1,[{
                                offset: 0,
                                color: 'rgba(69, 73, 240, 0)'
                            }, {
                                offset: 0.5,
                                color: 'rgba(69, 73, 240, .25)'
                            }, {
                                offset: 1,
                                color: 'rgba(69, 73, 240, 1)'
                            }],false),
                            shadowBlur: 5,
                            shadowColor: '#000',
                        }
                    },
                    backgroundStyle: {
                        color: new LinearGradient(1,0,0.5,1,[{
                            offset: 1,
                            color: 'rgba(68, 145, 253, 0)'
                        }, {
                            offset: 0.5,
                            color: 'rgba(68, 145, 253, .25)'
                        }, {
                            offset: 0,
                            color: 'rgba(68, 145, 253, 1)'
                        }],false),
                    },
                },
            ],
        };
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
