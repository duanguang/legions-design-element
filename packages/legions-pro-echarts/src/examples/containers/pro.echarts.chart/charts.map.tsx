import React from 'react';
import { LegionsProEchartsBox, LegionsProEchartsLayout, LegionsProEchartsMap } from 'components';

export class MapDemo extends React.Component{

    render() {
        return (
            <LegionsProEchartsBox title="地图" height="500px">
                <LegionsProEchartsMap></LegionsProEchartsMap>
            </LegionsProEchartsBox>
        )
    }
}
