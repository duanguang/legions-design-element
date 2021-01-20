


import React from 'react';
/* import 'jsdom-global/register';  */
import echarts from 'echarts/lib/echarts';
import LegionsProEchartsChartPie from '..';
import { mount,render,shallow, configure} from 'enzyme';
import { observablePromise } from 'legions/store-utils';
import { IExtendsOption } from 'components/interface/interface';

/* import jsdom from 'jsdom'
const { JSDOM } = jsdom;
const doc =new JSDOM('<!doctype html><html><body></body></html>')
//@ts-ignore
global.document = doc
//@ts-ignore
global.window = doc.defaultView */
const barOptions={
    legend: {
        bottom: 20,
        itemWidth: 12,
        itemHeight: 5,
        },
    series: [{
        radius: ['28%','40%'],
        center: ['50%','40%'],
        data:[
            { value: 5210, name: '保税跨境', selected: true, itemStyle: { color: '#407fcc' } },
            { value: 9610, name: '跨境直邮', selected: true, itemStyle: { color: '#00D2FF' } },
        ]
    }],
}
const events: Partial<Record<keyof HTMLElementEventMap, (ev: Partial<Event>) => void>> = {};
class LegionsProEchartsChartPieMouter extends React.Component{
    //@ts-ignore
    private container: HTMLDivElement=null;
    //@ts-ignore
    chartsRef: echarts.ECharts = null;
    componentDidMount() {
        /* this.container.addEventListener = jest
          .fn()
          .mockImplementation((event: keyof HTMLElementEventMap, cb: (ev: Partial<Event>) => void) => {
            events[event] = cb;
          }); */
    }
    getTarget = () => this.container;
    render() {
        return <LegionsProEchartsChartPie
            option={barOptions}
            className="echarts-for-react-root"
            onChartReady={(instance: echarts.ECharts) => {
                this.chartsRef = instance;
            }}
        ></LegionsProEchartsChartPie>
    }
}
class LegionsProEchartsChartPieAutoMouter extends React.Component{
    // @ts-ignore
    chartsRef:echarts.ECharts = null
    // @ts-ignore
    pieMethod:IExtendsOption = null
    handleTest=()=>{
        this.pieMethod.methods.onSearch()
    }
    render(){
        return <LegionsProEchartsChartPie
            className={'echarts-for-react-root'}
            option={{
                legend: {
                    bottom: 20,
                    itemWidth: 12,
                    itemHeight: 5,
                },
                series: [{
                    radius: ['28%','40%'],
                    center: ['50%','40%'],
                }],
            }}
            onChartReady={(instance,methodRef) => {
                this.chartsRef = instance;
                this.pieMethod = methodRef
            }}
            autoQuery={{
                model: {},
                url: 'https://gateway.hoolinks.com/api/gateway',
                method: 'post',
                params: { pageSize: 3000, pageNo: 1 },
                headerOption: {
                    "api-target": 'https://uat-api.hoolinks.com/scmjg/dcl/exports-goods-model/list',
                    "api-cookie": 'SESSION=7262ae70-61d1-4cb5-bd67-6e398123ea0b; HL-Access-Token=MGI0YTY1OTItZTM2OC00OGNhLWJlOGQtZWY0OTU2M2NkZmRk; UCTOKEN=MGI0YTY1OTItZTM2OC00OGNhLWJlOGQtZWY0OTU2M2NkZmRk;'
                },
                responseTransform: (response: observablePromise.PramsResult<{}>) => {
                    if (true) {
                        return {
                            series:[
                                {
                                    data:[{id:900,bizopEtpsNm:'昊链科技'},{id:100,bizopEtpsNm:'测试科技'}].map((item, index) => {
                                        return { value: item.id,name: item.bizopEtpsNm,selected: true,itemStyle: { color: '#407fcc' } }
                                    })
                                }
                            ]
                        }
                    }
                    return {}
                }
            }}
        ></LegionsProEchartsChartPie>
    }
}

describe('饼图',() => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.useRealTimers();
    });
    it('getEchartsInstance',() => {
        const component = mount(<LegionsProEchartsChartPieMouter
        ></LegionsProEchartsChartPieMouter>);
        expect(component.instance()).not.toBe(null)
        expect(component.instance().chartsRef.id.substring(0, 3)).toBe('ec_');
    })
    it('default props',() => {
        /* const wrapper = render(<LegionsProEchartsChartPieMouter></LegionsProEchartsChartPieMouter>); */
        const component = mount(<LegionsProEchartsChartPieMouter
            ></LegionsProEchartsChartPieMouter>);

        expect(component.exists()).toBe(true);
        expect(component.find('div').length).toBe(1);
         // root tag
        expect(component.getDOMNode().nodeName.toLowerCase()).toBe('div');
         // class name
        expect(component.getDOMNode().className).toBe('legions-pro-echarts echarts-for-react-root');
        // style
        expect(component.getDOMNode().style.height).toBe('100%');

        // default props
        /* expect(component.props().option).toEqual(barOptions); */
        /* console.table(component) */
    })
    it('autoQuery',() => {
        const component = mount(<LegionsProEchartsChartPieAutoMouter
            ></LegionsProEchartsChartPieAutoMouter>);
        expect(component.exists()).toBe(true);
        expect(component.find('div').length).toBe(1);
        expect(component.getDOMNode().nodeName.toLowerCase()).toBe('div');
        expect(component.getDOMNode().className).toBe('legions-pro-echarts echarts-for-react-root');
        expect(component.getDOMNode().style.height).toBe('100%');
    })
})
