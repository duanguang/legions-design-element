import { LegionsProEchartsBox, LegionsProEchartsCard } from 'components';
import React from 'react';

export class ChartsCardDemo1 extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox height="240px">
                <LegionsProEchartsCard
                    total={126}
                    title={'本月新增审核企业'}
                ></LegionsProEchartsCard>
            </LegionsProEchartsBox>
        )
    }
}
