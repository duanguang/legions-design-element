/*
 * @Author: duanguang
 * @Date: 2021-03-02 14:19:18
 * @LastEditTime: 2021-03-04 14:07:04
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/App.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Route,Switch } from 'legions/router';
import React from 'react';
/* import '../assets/css/theme.less'; */
import '../assets/css/theme.less'
import { ProForm } from './proForm';
import { ProLayout } from './proLayout';
import { ProModal } from './proModal';
import QueryDemo from './proQuery';
import ProSelectDemo from './proSelect';
/* import { LegionsProEchartsMapDemo } from './pro.echarts.map';
import { LegionsProEchartsLayoutDemo } from './pro.echarts.layout'; */
/* import { LegionsProEchartsBoxDemo } from './pro.echarts.box';
import { LegionsProEchartsChartPieDemo } from './pro.echarts.chart';
import { LegionsProEchartsMapDemo } from './pro.echarts.map'; */
import { ProTable } from './proTable';
import ZoomableDemo from './react-zoomable/demo';
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
                <Route path="/layout" component={ProLayout}></Route>
                <Route path="/select" component={ProSelectDemo}></Route>
                <Route path="/zoom" component={ZoomableDemo}></Route>
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
