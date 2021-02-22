/*
 * @Author: duanguang
 * @Date: 2020-12-17 10:26:11
 * @LastEditTime: 2020-12-18 11:06:26
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/LegionsProEchartsLiquidFill/liquidFillSeries.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import completeDimensions from 'echarts/lib/data/helper/completeDimensions';
import * as echarts from 'echarts/core';

export function liquidFillSeries() {
    echarts['extendSeriesModel']({
        type: 'series.liquidFill',
        visualColorAccessPath: 'textStyle.normal.color',
        optionUpdated: function () {
            var option = this.option;
            option.gridSize = Math.max(Math.floor(option.gridSize), 4);
        },
        getInitialData: function (option, ecModel) {
            var dimensions = completeDimensions(['value'], option.data);
            var list = new echarts['List'](dimensions, this);
            list.initData(option.data);
            return list;
        },
       defaultOption: {
            color: [new echarts.graphic.LinearGradient(0,0,0,1,[{
                offset: 1,
                color: 'rgba(58, 71, 212, 0)'
            }, {
                offset: 0.5,
                color: 'rgba(31, 222, 225, .2)'
            }, {
                offset: 0,
                color: 'rgba(31, 222, 225, 1)'
            }],false)],
            center: ['50%', '50%'],
            radius: '50%',
            amplitude: '8%',
            waveLength: '80%',
            phase: 'auto',
            period: 'auto',
            direction: 'right',
            shape: 'circle',

            waveAnimation: true,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear',
            animationDuration: 2000,
            animationDurationUpdate: 1000,

            /* outline: {
                show: true,
                borderDistance: 8,
                itemStyle: {
                    color: 'none',
                    borderColor: '#294D99',
                    borderWidth: 8,
                    shadowBlur: 20,
                    shadowColor: 'rgba(0, 0, 0, 0.25)'
                }
            }, */
            outline: {
                show: true,
                borderDistance: 0,
                itemStyle: {
                    borderWidth: 8,
                    borderColor: new echarts.graphic.LinearGradient(0,0,0,1,[{
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
                color: new echarts.graphic.LinearGradient(1,0,0.5,1,[{
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
            itemStyle: {
                opacity: 0.95,
                shadowBlur: 50,
                shadowColor: 'rgba(0, 0, 0, 0.4)'
            },
            label: {
                show: true,
                color: '#aab2fa',
                insideColor: '#fff',
                fontSize: 20,
                /* fontWeight: 'bold', */
                top:'68%',
                align: 'center',
                baseline: 'middle',
                position: 'inside',
                formatter: '{b}\n',
                /* normal: {
                    formatter: '1000',
                } */
            },

            emphasis: {
                itemStyle: {
                    opacity: 0.8
                }
            }
        }
    })
}
