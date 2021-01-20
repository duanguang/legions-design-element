
import React from 'react';
import LegionsProEchartsChartLine from '..';
import { mount,render,shallow, configure} from 'enzyme';
import { IExtendsOption, IMethods } from 'components/interface/interface';
import { observablePromise } from 'legions/store-utils';
let lineOptions: echarts.EChartOption = {
    legend: {
        data: ['出口','进口'],
    },
    xAxis: {
        data: ['202001','202002','202003','202004','202005','202006','202007','202008','202009','202010'],

    },
    series: [
        {
            name: '出口',
            type: 'line',
            stack: '总量',
            symbolSize: 5,
            // tslint:disable-next-line: no-magic-numbers
            data: [10.32,12.43,26.45,20.09,34.42,11.43,13.58,25.47,38.45,31.58],
            itemStyle: {
                normal: {
                    label: { show: true },
                },
            },
        },
        {
            name: '进口',
            type: 'line',
            stack: '总量',
            symbolSize: 5,
            // tslint:disable-next-line: no-magic-numbers
            data: [11.43,13.58,25.47,38.45,31.58,26.45,20.09,34.42,11.43,42.56],
            itemStyle: {
                normal: {
                    color: '#ff9933',
                    label: { show: true,color: '#ff9933' },
                    lineStyle: {
                        color: '#ff9933',
                    },
                },
            },
        },
    ]
}
class LegionsProEchartsChartLineMouter extends React.Component{
    // @ts-ignore
    lineRef:echarts.ECharts = null
    // @ts-ignore
    methodRef:IExtendsOption = null
    render(){
        return (
            <LegionsProEchartsChartLine
                option={lineOptions}
                className="echart-for-react-line"
                style={{margin:10}}
                onChartReady={(instance,mothod)=>{
                    this.lineRef = instance
                    this.methodRef = mothod!
                }}
            ></LegionsProEchartsChartLine>
        )
    }
}
class LegionsProEchartsChartLineAutoMouter extends React.Component{
    // @ts-ignore
    lineAutoRef:echarts.ECharts = null
    // @ts-ignore
    lineAutoMethod:IExtendsOption = null
    render(){
        return (
            <LegionsProEchartsChartLine
                className="echart-for-react-auto-line"
                option={{
                    xAxis: {
                        data: ['202001', '202002', '202003', '202004', '202005', '202006', '202007', '202008', '202009', '202010'],
                    }
                }}
                onChartReady={(instance, extendsOption) => {
                    this.lineAutoRef = instance
                    this.lineAutoMethod = extendsOption!
                }}
                autoQuery={{
                    model: {},
                    url: 'https://gateway.hoolinks.com/api/gateway',
                    method: 'post',
                    params: { pageSize: 3000, pageNo: 1 },
                    headerOption: {
                        "api-target": 'https://uat-api.hoolinks.com/scmjg/dcl/exports-goods-model/list',
                        "api-cookie": 'SESSION=d2ef8c85-7e92-4fba-b1a8-8233cb7843c3; HL-Access-Token=YjMxYzlmOTQtZTVlOC00NTQ2LWE4ZjQtY2Q4N2VjMzBhNmRi; UCTOKEN=YjMxYzlmOTQtZTVlOC00NTQ2LWE4ZjQtY2Q4N2VjMzBhNmRi;'
                    },
                    responseTransform: (response: observablePromise.PramsResult<{}>) => {
                        if (true) {
                            return {
                                series:[{id:'test1'},{id:'test2'}].map((item, index) => {
                                    return {
                                        name: item.id.toString(),
                                        type: 'line',
                                        stack: '总量',
                                        symbolSize: 5,
                                        // tslint:disable-next-line: no-magic-numbers
                                        data: [10.32, 12.43, 26.45, 20.09, 34.42, 11.43, 13.58, 25.47, 38.45, 31.58].map(item => item + index),
                                        itemStyle: {
                                            normal: {
                                                label: { show: true },
                                            },
                                        },
                                    }
                                })
                            }
                        }
                        return {}
                    }
                }}></LegionsProEchartsChartLine>
        )
    }
}
describe('折线图',() => {
    beforeAll(()=>{
        jest.useFakeTimers()
    })
    it('getEchartsInstance',() => {
        const component = mount(<LegionsProEchartsChartLineMouter
        ></LegionsProEchartsChartLineMouter>);
        expect(component.instance()).not.toBe(null)
        expect(component.instance().lineRef.id.substring(0,3)).toBe('ec_')
    })
    it('default props line',()=>{
        const component = mount(<LegionsProEchartsChartLineMouter></LegionsProEchartsChartLineMouter>)
        expect(component.exists()).toBe(true)
        expect(component.find('div').length).toBe(1)
        expect(component.getDOMNode().nodeName.toLowerCase()).toBe('div');
        expect(component.getDOMNode().className).toBe('legions-pro-echarts echart-for-react-line')
        expect(component.getDOMNode().style.height).toBe('100%')
        expect(component.getDOMNode().style.margin).toBe('10px')
    })
    it('autoQuery',()=>{
        const component = mount(<LegionsProEchartsChartLineAutoMouter></LegionsProEchartsChartLineAutoMouter>)
        expect(component.exists()).toBe(true)
        expect(component.find('div').length).toBe(1)
        expect(component.getDOMNode().nodeName.toLowerCase()).toBe('div');
        expect(component.getDOMNode().className).toBe('legions-pro-echarts echart-for-react-auto-line')
        expect(component.getDOMNode().style.height).toBe('100%')
    })
})
