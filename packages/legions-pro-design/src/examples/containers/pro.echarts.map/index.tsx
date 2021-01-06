import { LegionsProEchartsMap } from '../../../components/LegionsProEchartsMap';
import React from 'react';
import echarts from 'echarts/lib/echarts';
export class LegionsProEchartsMapDemo extends React.Component{
    
    render() {
        return <div style={{width:'100%',height:'100vh'}}>
            <LegionsProEchartsMap
            /* option={this.option} */
        ></LegionsProEchartsMap>
        </div>
    }
}