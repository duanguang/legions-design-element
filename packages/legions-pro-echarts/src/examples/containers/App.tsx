import { Route, Switch } from 'legions/router';
import React from 'react';
import { LegionsProEchartsBoxDemo } from './pro.echarts.box';
import { LegionsProEchartsChartPieDemo } from './pro.echarts.chart';
import { LayoutBaseDemo } from './pro.echarts.layout/base';
import { LayoutFullDemo } from './pro.echarts.layout/full';
import { ListBaseDemo } from './pro.echarts.table/base';
import { ProProgressDemo } from './pro.progress/base';
import { ProPieDemo } from './pro.echart.pie/base';

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
                 {/* 基础表格 */}
                <Route path="/listBase" component={ListBaseDemo}></Route>
                 {/* 列表模型 */}
                <Route path="/box" component={LegionsProEchartsBoxDemo}></Route>
                 {/* chart合集 */}
                <Route path="/chart" component={LegionsProEchartsChartPieDemo}></Route>
                 {/* 进度条 */}
                <Route path="/progress" component={ProProgressDemo}></Route>
                <Route path="/pie" component={ProPieDemo}></Route>
            </Switch>
        );
    }
}
