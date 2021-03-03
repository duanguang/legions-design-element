import React from 'react';
import  LegionsProEcharts from '../LegionsProEcharts';
import { echarts, LegionsProEchartsOption, LegionsProEchartsPropsTypes } from '../interface'
import { merge } from 'lodash';
import { MapChart, MapSeriesOption } from 'echarts/charts';
echarts.use([MapChart]);
const world = require('../locale/world.json');
const nameCN = require('../locale/country-name-zh.json')

export class LegionsProEchartsMapProps extends LegionsProEchartsPropsTypes<MapSeriesOption>{
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
    get option(): LegionsProEchartsOption<MapSeriesOption> {
        return {
            tooltip: {
                trigger: 'item',
            },
            series: [
                {
                    type: 'map',
                    map: 'world',
                    zoom: 1,
                    roam: true,
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
            ],
        };
    }
    render() {
        const { option } = this.props;
        return (
            <LegionsProEcharts<MapSeriesOption>
                {...this.props}
                option={merge(this.option, option)}
            ></LegionsProEcharts>
        )
    }
}
