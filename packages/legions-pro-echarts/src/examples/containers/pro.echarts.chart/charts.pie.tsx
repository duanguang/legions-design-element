import { Button } from 'antd';
import { LegionsProEchartsBox, LegionsProEchartsPie } from 'components';
import { LegionsProEchartsInstance } from 'components/interface';
import { mockService } from 'examples/services/mockService';
import React from 'react';

export class ChartsPieDemo1 extends React.Component {
    chartRef: LegionsProEchartsInstance = {};
    render() {
        return (
            <LegionsProEchartsBox title="饼图" height="240px">
                <LegionsProEchartsPie
                    data={[
                        { value: 5210, name: '保税跨境', selected: true, itemStyle: { color: '#407fcc' } },
                        { value: 9610, name: '跨境直邮', selected: true, itemStyle: { color: '#00D2FF' } },
                    ]}
                ></LegionsProEchartsPie>
            </LegionsProEchartsBox>
        )
    }
}

export class ChartsPieDemo2 extends React.Component {
    chartRef: LegionsProEchartsInstance = {};
    render() {
        return (
            <LegionsProEchartsBox
                title={<div>
                    饼图请求自动托管
                    {/* <Button size="small" onClick={() => {
                        this.chartRef.methods?.onSearch(2)
                    }} icon="reload"></Button> */}
                </div>}
                height="240px"
            >
                <LegionsProEchartsPie
                    onChartReady={(instance: LegionsProEchartsInstance) => {
                        this.chartRef = instance;
                    }}
                    request={mockService.pieData}
                ></LegionsProEchartsPie>
            </LegionsProEchartsBox>
        )
    }
}
