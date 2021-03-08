import { Route, Switch } from 'legions/router';
import React from 'react';
import { LegionsProEchartsChartPieDemo } from './pro.echarts.chart';
import { LayoutBaseDemo } from './pro.echarts.layout/base';
import { LayoutFullDemo } from './pro.echarts.layout/full';
import PartsDemo from './pro.echarts.parts';
import { MapDemo, MapSimpleDemo } from './pro.echarts.chart/charts.map';
import { LegionsProEchartsLayout } from 'components';
import { TableDemo } from './pro.echarts.parts/table';

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
                <Route path="/chart/map" component={() =><LegionsProEchartsLayout><MapSimpleDemo></MapSimpleDemo><MapDemo/></LegionsProEchartsLayout>}></Route>
                {/* 零件，button，input，date-picker, radio等等 */}
                <Route path="/parts" exact component={PartsDemo}></Route>
                {/* 表格 */}
                <Route path="/parts/table" component={TableDemo}></Route>
            </Switch>
        );
    }
}
