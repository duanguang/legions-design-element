import { Route,Switch } from 'legions/router';
import React from 'react';
/* import '../assets/css/theme.less'; */
import '../assets/css/theme.less'
import { ProForm } from './proForm';
import { ProModal } from './proModal';
import QueryDemo from './proQuery';
/* import { LegionsProEchartsMapDemo } from './pro.echarts.map';
import { LegionsProEchartsLayoutDemo } from './pro.echarts.layout'; */
/* import { LegionsProEchartsBoxDemo } from './pro.echarts.box';
import { LegionsProEchartsChartPieDemo } from './pro.echarts.chart';
import { LegionsProEchartsMapDemo } from './pro.echarts.map'; */
import { ProTable } from './proTable';
import { ProTabsForm } from './tabsForm';


export default class App extends React.Component {
    /* unstable_handleError(e) {
        console.dir(e,'unstable_handleError');
    } */
    
    render() {
        return (
            <Switch>
                <React.Fragment>
 
                <Route path="/table" component={ProTable}></Route>
                <Route path="/form" component={ProForm}></Route>
                <Route path="/tform" component={ProTabsForm}></Route>
                <Route path="/modal" component={ProModal}></Route>
                <Route path="/query" component={QueryDemo}></Route>
                {/* <Route path="/chart" component={LegionsProEchartsChartPieDemo}></Route> */}
                {/* <Route component={() => {
                        return <div>hello world</div>
                    }}/> */}
                {this.props.children}
                </React.Fragment>
                </Switch>
        );
    }
}
