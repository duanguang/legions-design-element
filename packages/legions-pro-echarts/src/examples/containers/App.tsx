import { Route, Switch } from 'legions/router';
import React from 'react';
import { LegionsProEchartsBoxDemo } from './pro.echarts.box';
import { LegionsProEchartsChartPieDemo } from './pro.echarts.chart';
import { LayoutBaseDemo } from './pro.echarts.layout/base';
import { LayoutFullDemo } from './pro.echarts.layout/full';
import { ListBaseDemo } from './pro.echarts.table/base';
import { LegionsProEchartsMapDemo } from './pro.echarts.map';


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
                 {/* 页面容器，容器超出显示滚动条 */}
                <Route path="/layoutBase" component={LayoutBaseDemo}></Route>
                 {/* 页面容器，满屏显示，超出隐藏 */}
                <Route path="/layoutFull" component={LayoutFullDemo}></Route>
                 {/* 列表 */}
                <Route path="/listBase" component={ListBaseDemo}></Route>
                <Route path="/map" component={LegionsProEchartsMapDemo}></Route>
                <Route path="/box" component={LegionsProEchartsBoxDemo}></Route>
                <Route path="/chart" component={LegionsProEchartsChartPieDemo}></Route>
            </Switch>
        );
    }
}
