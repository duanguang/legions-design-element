import { Button } from 'antd';
import { LegionsProEchartsBox, LegionsProEchartsChartPie } from 'components';
import { LegionsProEchartsInstance } from 'components/interface';
import { mockService } from 'examples/services/mockService';
import React from 'react';

export default class ChartsPieDemo extends React.Component {
    chartRef: LegionsProEchartsInstance = {};

    render() {
        return (
            <LegionsProEchartsBox
                title={<div>
                    饼图请求自动托管
                    <Button size="small" onClick={() => {
                        this.chartRef.methods?.onSearch(2)
                    }} icon="reload"></Button>
                </div>}
                height="240px"
            >
                <LegionsProEchartsChartPie
                    onChartReady={(instance: LegionsProEchartsInstance) => {
                        this.chartRef = instance;
                    }}
                    request={mockService.pieData}
                ></LegionsProEchartsChartPie>
            </LegionsProEchartsBox>
        )
    }
}
