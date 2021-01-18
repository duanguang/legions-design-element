


import React from 'react';
/* import 'jsdom-global/register';  */
import echarts from 'echarts/lib/echarts';
import LegionsProEchartsChartPie from '..';
import { mount,render,shallow, configure} from 'enzyme';

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
        data={[
            { value: 5210,name: '保税跨境',selected: true,itemStyle: { color: '#407fcc' } },
            { value: 9610,name: '跨境直邮',selected: true,itemStyle: { color: '#00D2FF' } },
        ]}
        onChartReady={(instance: echarts.ECharts) => {
            this.chartsRef = instance;
        }}
    ></LegionsProEchartsChartPie>
    }
}

describe('饼图',() => {
    /* const domMock = jest.spyOn(HTMLElement.prototype,'getBoundingClientRect');
    const classRect: Record<string, DOMRect> = {
        container: {
          top: 0,
          bottom: 100,
        } as DOMRect,
    }; */
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
})
