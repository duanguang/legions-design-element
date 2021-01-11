import { Route,Switch } from 'legions/router';
import React from 'react';
/* import '../assets/css/theme.less'; */
import '../assets/css/theme.less'
/* import { LegionsProEchartsMapDemo } from './pro.echarts.map';
import { LegionsProEchartsLayoutDemo } from './pro.echarts.layout'; */
/* import { LegionsProEchartsBoxDemo } from './pro.echarts.box';
import { LegionsProEchartsChartPieDemo } from './pro.echarts.chart';
import { LegionsProEchartsMapDemo } from './pro.echarts.map'; */


export default class App extends React.Component {
    unstable_handleError(e) {
        console.dir(e,'unstable_handleError');
    }
    constructor() {
        super()
    }
    render() {
        return (
            <Switch>

                {/* <Route path="/map" component={LegionsProEchartsMapDemo}></Route>
                <Route path="/box" component={LegionsProEchartsBoxDemo}></Route>
                <Route path="/chart" component={LegionsProEchartsChartPieDemo}></Route> */}
                {/* <Route path="/chart" component={LegionsProEchartsChartPieDemo}></Route> */}
                {/* <Route component={() => {
                        return <div>hello world</div>
                    }}/> */}
                {this.props.children}
            </Switch>
        );
    }
}
