import { LegionsProEchartsBox, LegionsProEchartsRadar } from 'components';
import React from 'react';

export class ChartsRadarDemo1 extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox title="雷达图" height="350px">
                <LegionsProEchartsRadar
                    option={{
                        radar: {
                            indicator: [
                                { name: '销售', max: 6500},
                                { name: '管理', max: 16000},
                                { name: '信息技术', max: 30000},
                                { name: '客服', max: 38000},
                                { name: '研发', max: 52000},
                                { name: '市场', max: 25000},
                            ]
                        },
                        series: [{
                            data : [
                                {
                                    value : [4300, 10000, 28000, 35000, 50000, 19000],
                                    name : '预算分配'
                                },
                                {
                                    value : [5000, 14000, 28000, 31000, 42000, 21000],
                                    name : '实际开销'
                                }
                            ]
                        }]
                    }}
                ></LegionsProEchartsRadar>
            </LegionsProEchartsBox>
        )
    }
}
