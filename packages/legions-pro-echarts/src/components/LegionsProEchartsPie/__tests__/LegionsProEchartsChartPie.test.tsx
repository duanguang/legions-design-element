


import React from 'react';
/* import 'jsdom-global/register';  */
import echarts from 'echarts/lib/echarts';
import LegionsProEchartsPie from '..';
import { mount,render,shallow, configure} from 'enzyme';
import { observablePromise } from 'legions/store-utils';

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
class LegionsProEchartsPieMouter extends React.Component{
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
        return <LegionsProEchartsPie
            option={barOptions}
            className="echarts-for-react-root"
            onChartReady={(instance: echarts.ECharts) => {
                this.chartsRef = instance;
            }}
        ></LegionsProEchartsPie>
    }
}
class LegionsProEchartsPieAutoMouter extends React.Component{
    // @ts-ignore
    chartsRef:echarts.ECharts = null
    // @ts-ignore
    pieMethod:IExtendsOption = null
    handleTest=()=>{
        this.pieMethod.methods.onSearch()
    }
    render(){
        return <LegionsProEchartsPie
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
            onChartReady={(instance) => {
                this.chartsRef = instance;
            }}
        ></LegionsProEchartsPie>
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
        const component = mount(<LegionsProEchartsPieMouter
        ></LegionsProEchartsPieMouter>);
        expect(component.instance()).not.toBe(null)
        expect(component.instance().chartsRef.id.substring(0, 3)).toBe('ec_');
    })
    it('default props',() => {
        /* const wrapper = render(<LegionsProEchartsPieMouter></LegionsProEchartsPieMouter>); */
        const component = mount(<LegionsProEchartsPieMouter
            ></LegionsProEchartsPieMouter>);

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
        const component = mount(<LegionsProEchartsPieAutoMouter
            ></LegionsProEchartsPieAutoMouter>);
        expect(component.exists()).toBe(true);
        expect(component.find('div').length).toBe(1);
        expect(component.getDOMNode().nodeName.toLowerCase()).toBe('div');
        expect(component.getDOMNode().className).toBe('legions-pro-echarts echarts-for-react-root');
        expect(component.getDOMNode().style.height).toBe('100%');
    })
})
