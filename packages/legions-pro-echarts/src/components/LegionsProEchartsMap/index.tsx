import React from 'react';
import  LegionsProEcharts from '../LegionsProEcharts';
import { echarts, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface'
import { merge } from 'lodash';
import { EffectScatterChart, EffectScatterSeriesOption, LinesChart, LinesSeriesOption, MapChart, MapSeriesOption } from 'echarts/charts';
echarts.use([MapChart,LinesChart,EffectScatterChart]);
const world = require('../locale/world.json');
const nameCN = require('../locale/country-name-zh.json')

export class LegionsProEchartsMapProps extends LegionsProEchartsPropsTypes<MapSeriesOption | LinesSeriesOption | EffectScatterSeriesOption>{
    /** 是否初始化世界地图, 默认true */
    initRegisterWorldMap?: boolean = true
}

export default class LegionsProEchartsMap extends React.Component<LegionsProEchartsMapProps>{
    static defaultProps: Readonly<LegionsProEchartsMapProps> = new LegionsProEchartsMapProps()
    static countryNameZh = nameCN;
    static worldData = world;

    componentWillMount() {
        this.props.initRegisterWorldMap && echarts.registerMap('world', LegionsProEchartsMap.worldData)
    }
    get option(): LegionsProEchartsOption<MapSeriesOption | LinesSeriesOption | EffectScatterSeriesOption> {
        return {
            tooltip: {
                trigger: 'item',
            },
            geo: {
                map: 'world',
                geoIndex: 0,
                zoom: 1,
                roam: false,
                label: {
                    color: '#fff',
                },
                itemStyle: {
                    borderColor: 'rgba(147, 235, 248, 1)',
                    borderWidth: 1,
                    areaColor: new echarts.graphic.LinearGradient(0,0,1,1,[{
                        offset: 0,
                        color: 'rgba(147, 235, 248, 0)'
                    }, {
                        offset: 1,
                        color: 'rgba(147, 235, 248, .2)'
                    }]),
                },
                emphasis: {
                    label: {
                        color: '#fff',
                    },
                    itemStyle: {
                        areaColor: new echarts.graphic.LinearGradient(0,0,1,1,[{
                            offset: 0,
                            color: 'rgba(147, 235, 248, 0)'
                        }, {
                            offset: 1,
                            color: 'rgba(147, 235, 248, 0.8)'
                        }])
                    }
                },
                nameMap: this.props.initRegisterWorldMap && LegionsProEchartsMap.countryNameZh,
            },
            series: [
                {
                    geoIndex: 0,
                    type: 'map',
                    map: 'world',
                    nameMap: this.props.initRegisterWorldMap && LegionsProEchartsMap.countryNameZh,
                },
                {
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    showEffectOn: 'render',
                    zlevel:1,
                    rippleEffect: {
                        period: 15,
                        scale: 4,
                        brushType: 'fill'
                    },
                    label: {
                        formatter: '{b}',
                        position: 'right',
                        offset: [15, 0],
                        color: '#1DE9B6',
                        show: true
                    },
                    itemStyle: {
                        color:'#1DE9B6',
                        shadowBlur: 10,
                        shadowColor: '#333'
                    },
                    symbolSize: 10,
                },
                {
                    type: 'lines',
                    zlevel: 2,
                    tooltip: { show: false },
                    effect: {
                        show: true,
                        period: 4, //箭头指向速度，值越小速度越快
                        trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                        symbol: 'circle', //箭头图标
                        symbolSize: 7, //图标大小
                    },
                    lineStyle: {
                        color:'#1DE9B6',
                        width: 1, //线条宽度
                        opacity: 0.1, //尾迹线条透明度
                        curveness: .3 //尾迹线条曲直度
                    },
                }
            ],
        };
    }
    render() {
        const { option } = this.props;
        return (
            <LegionsProEcharts<MapSeriesOption | LinesSeriesOption | EffectScatterSeriesOption>
                {...this.props}
                option={merge(this.option, option)}
            ></LegionsProEcharts>
        )
    }
}
