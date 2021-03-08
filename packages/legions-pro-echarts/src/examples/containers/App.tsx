import { Route, Switch } from 'legions/router';
import React from 'react';
import { LegionsProEchartsBoxDemo } from './pro.echarts.box';
import { LegionsProEchartsChartPieDemo } from './pro.echarts.chart';
import { LayoutBaseDemo } from './pro.echarts.layout/base';
import { LayoutFullDemo } from './pro.echarts.layout/full';
import { ProPieDemo } from './pro.echart.pie/base';
import PartsDemo from './pro.echarts.parts';
import { MapDemo, MapSimpleDemo } from './pro.echarts.chart/charts.map';
import { LegionsProEchartsLayout } from 'components';

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
                {/* chart合集 */}
                <Route path="/chart" exact component={LegionsProEchartsChartPieDemo}></Route>
                {/* chart.map */}
                <Route path="/chart/map" component={() =>
                    <LegionsProEchartsLayout><MapSimpleDemo></MapSimpleDemo><MapDemo/></LegionsProEchartsLayout>
                }></Route>
                {/* 零件，button，input，date-picker, radio等等 */}
                <Route path="/parts" component={PartsDemo}></Route>
                {/* 列表模型 */}
                <Route path="/box" component={LegionsProEchartsBoxDemo}></Route>
                {/* 饼图 */}
                <Route path="/pie" component={ProPieDemo}></Route>
            </Switch>
        );
    }
}
