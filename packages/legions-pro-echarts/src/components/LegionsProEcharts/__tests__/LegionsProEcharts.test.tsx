


import React from 'react';
/* import 'jsdom-global/register';  */
import echarts from 'echarts/lib/echarts';
import { mount,render,shallow,configure } from 'enzyme';
import { LegionsProEcharts } from '..';

const barOptions = {
    title: {
        text: 'ECharts 入门示例'
    },
    tooltip: {},
    legend: {
        data: ['销量']
    },
    xAxis: {
        data: ['衬衫','羊毛衫','雪纺衫','裤子','高跟鞋','袜子']
    },
    yAxis: {},
    series: [{
        name: '销量',
        type: 'bar',
        data: [5,20,36,10,10,20]
    }]
}


describe('折线图',() => {
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
        const component = mount(<LegionsProEcharts
        ></LegionsProEcharts>);
        debugger
        expect(component.instance()).not.toBe(null)
        expect(component.instance().getEchartsInstance().id.substring(0,3)).toBe('ec_');
    })
    it('default props',() => {
        /* const wrapper = render(<LegionsProEchartsChartPieMouter></LegionsProEchartsChartPieMouter>); */
        /* const component = mount(<LegionsProEcharts option={barOptions}
            className="echarts-for-react-root"
        ></LegionsProEcharts>);

        expect(component.exists()).toBe(true);
        expect(component.find('div').length).toBe(1);
        // root tag
        expect(component.getDOMNode().nodeName.toLowerCase()).toBe('div');
        // class name
        expect(component.getDOMNode().className).toBe('legions-pro-echarts echarts-for-react-root');
        // style
        expect(component.getDOMNode().style.height).toBe('100%');

        // default props
        expect(component.props().option).toEqual(barOptions);

        expect(component.props().style).toEqual({});

        expect(component.props().className).toBe('echarts-for-react-root');

        expect(component.props().theme).not.toBe(null);

        expect(typeof component.props().onChartReady).toBe('function');
        expect(component.props().loading).toBe(false);
        expect(component.props().onEvents).toEqual({}); */
        /* console.table(component) */
    })
})