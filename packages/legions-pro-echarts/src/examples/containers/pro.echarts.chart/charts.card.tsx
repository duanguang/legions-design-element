import { LegionsProEchartsBox, LegionsProEchartsChartCard } from 'components';
import React from 'react';

export class ChartsCardDemo1 extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox height="240px">
                <LegionsProEchartsChartCard
                    total={126}
                    title={'本月新增审核企业'}
                ></LegionsProEchartsChartCard>
            </LegionsProEchartsBox>
        )
    }
}
