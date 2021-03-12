import { LegionsProEchartsBox, LegionsProEchartsLiquidFill } from 'components';
import React from 'react';

export class ChartsLiquidFillDemo1 extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox height="240px">
                <LegionsProEchartsLiquidFill
                    data={[0.5, 0.4, 0.4, 0.4]}
                ></LegionsProEchartsLiquidFill>
            </LegionsProEchartsBox>
        )
    }
}
