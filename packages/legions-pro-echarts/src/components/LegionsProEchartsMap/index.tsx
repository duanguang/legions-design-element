import 'echarts/lib/chart/map';
import echarts from 'echarts/lib/echarts';
import React from 'react';
import  {LegionsProEcharts} from '../LegionsProEcharts';
import { LegionsProEchartsPropsTypes } from '../interface/interface'
import { merge } from 'lodash';
const world = require('echarts/map/json/world.json');
const nameCN = require('../locale/country-name-zh.json')
import 'echarts-gl';
export class LegionsProEchartsMapProps extends LegionsProEchartsPropsTypes{
    /** 数据 */
    data?: echarts.EChartOption.SeriesMap.DataObject[] = [
        //@ts-ignore
        ...Object.values(nameCN).map((name: string) => {
            return { name, value: Math.ceil((Math.random() * 10000000)) }
        }),
    ];
    /** 配置项 */
    option?: echarts.EChartOption = {};
}
interface IState{
    data?:echarts.EChartOption.SeriesMap.DataObject[]
}
export class LegionsProEchartsMap extends React.Component<LegionsProEchartsMapProps,IState>{
    static readonly initData = [
        //@ts-ignore
        ...Object.values(nameCN).map((name: string) => {
            return { name, value: Math.ceil((Math.random() * 10000000)) }
        }),
    ] as echarts.EChartOption.SeriesMap.DataObject[];
    static countryNameZh = nameCN;
    timeAction: boolean = true;
    state = {
        data: LegionsProEchartsMap.initData
    }
    timeId: NodeJS.Timeout|null = null;
    //@ts-ignore
    chartsRef: echarts.ECharts = null;
    static defaultProps: Readonly<LegionsProEchartsMapProps> = new LegionsProEchartsMapProps()
    get option(): echarts.EChartOption {
        return {
            tooltip: {
                trigger: 'item',
            },
            series: [
                {
                    name: '出口报关单单量',
                    type: 'map3D',
                    map: 'world',
                    data:this.state.data,
                    itemStyle: {
                        color: '#0f2a37',
                        borderColor: '#00e7fb',
                        borderWidth: 1,
                    },
                    emphasis: {
                        label: {
                           show:false,
                        },
                        itemStyle: {
                            color: '#e1874d',
                        },
                    },
                    //@ts-ignore
                    groundPlane: {
                        show: true ,
                        color: 'rgba(0, 54, 81, 0.3)',
                    },
                    viewControl: {
                        projection: 'orthographic',
                        alpha: 30,
                        orthographicSize: 50
                    },
                    nameMap:LegionsProEchartsMap.countryNameZh,
                },
            ],
        } as echarts.EChartOption;
    }
    componentWillMount() {
        echarts.registerMap('world', world)
        this.timeId= setInterval(() => {
            this.timeAction && this.highlightSelect();
        },2000)
        
    }
    componentWillReceiveProps(nextProps: LegionsProEchartsMapProps) {
        if (this.props.data !== nextProps.data) {
            this.setState({
                data:this.props.data
            })
        }
    }
    componentDidMount() {
        /** 点击对应状态跳转到对应模块 */
        this.chartsRef.on('globalout',(e: echarts.EChartOption.Tooltip.Format) => {
            this.timeAction = true;
        })
        this.chartsRef.on('mouseover', (e: echarts.EChartOption.Tooltip.Format) => {
            this.timeAction = false;
            this.highlightSelect(e.dataIndex)
        })
    }
    componentWillUnmount() {
        clearInterval(this.timeId as NodeJS.Timeout)
    }
    highlightSelect(dataIndex?: number) {
        const timeIndex = dataIndex || Math.ceil(Math.random() * Object.values(nameCN).length)
        this.setState({
            //@ts-ignore
            data: [...LegionsProEchartsMap.initData.map((item, index) => {
                if (timeIndex === index) {
                    return {...item, height: 6, itemStyle: {color: '#e1874d'}, label: {
                        show: dataIndex ? false : true,
                        distance: 10000,
                        formatter: '{b}:{c}',
                        textStyle: {
                            fontSize: 12,
                        }
                    }}
                }
                return item
            })]
        })
    }
    render() {
        const { option } = this.props;
        return (
            <LegionsProEcharts
                {...this.props}
                option={merge(this.option, option)}
                onChartReady={(ref) => {
                    this.chartsRef = ref;
                }}
            ></LegionsProEcharts>
        ) 
    }
}
