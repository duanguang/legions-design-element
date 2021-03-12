import { LegionsProEchartsBox, LegionsProEchartsChartLine } from 'components';
import { mockService } from 'examples/services/mockService';
import React from 'react';

export class ChartsLineDemo1 extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox title="折线图" height="240px">
                <LegionsProEchartsChartLine
                    option={{
                        xAxis: {
                            data: ['A','B','C','D','E','F','G','H','I','J'],
                        },
                        series: [{
                            name: '进口', stack: '总量',
                            data: [11.43, 13.58, 25.47, 38.45, 31.58, 26.45, 20.09, 34.42, 11.43, 42.56],
                        }]
                    }}
                ></LegionsProEchartsChartLine>
            </LegionsProEchartsBox>
        )
    }
}

export class ChartsLineDemo2 extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox title="折线图自动托管数据" height="240px">
                <LegionsProEchartsChartLine
                    request={mockService.lineData}
                ></LegionsProEchartsChartLine>
            </LegionsProEchartsBox>
        )
    }
}
