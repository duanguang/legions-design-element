/*
 * @Author: duanguang
 * @Date: 2021-03-02 14:19:18
 * @LastEditTime: 2022-03-01 14:01:44
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/App.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Route,Switch } from 'legions/router';
import React from 'react'; 
/* import '../assets/css/theme.less'; */
import '../assets/css/theme.less'
/* import { CropperImage } from './cropper-image';
import Demo from './demo';
import { CenterLayout } from './demo-center';
import { FlexLayout } from './demo-layout';
import DataImportBaseDemo from './proDataImport/base';
import DataImportLocalDemo from './proDataImport/local'; */
import { ProForm } from './proForm';
import { ProLayout } from './proLayout';
/* import { ProLayout } from './proLayout';
import { ProModal } from './proModal';
import QueryDemo from './proQuery';
import ProSelectDemo from './proSelect'; */
/* import { LegionsProEchartsMapDemo } from './pro.echarts.map';
import { LegionsProEchartsLayoutDemo } from './pro.echarts.layout'; */
/* import { LegionsProEchartsBoxDemo } from './pro.echarts.box';
import { LegionsProEchartsChartPieDemo } from './pro.echarts.chart';
import { LegionsProEchartsMapDemo } from './pro.echarts.map'; */
import { ProTable } from './proTable';
import { ProTableForm } from './proTableForm';
import ZoomableDemo from './react-zoomable/demo';
import { ProTabsForm } from './tabsForm';
export default class App extends React.Component {
    /* unstable_handleError(e) {
        console.dir(e,'unstable_handleError');
    } */
    componentDidCatch(error, info) {     
        console.log(error,info);
    }
    render() {
        return (
            <Switch>
                <React.Fragment>

               {/*  <Route path="/table" component={ProTable}></Route>
                <Route path="/table-form" component={ProTableForm}></Route> */}
                   <Route path="/table-form" component={ProTableForm}></Route>
                    <Route path="/form" component={ProForm}></Route>
                    <Route path="/table" component={ProTable}></Route>
                    <Route path="/tform" component={ProTabsForm}></Route>
                    <Route path="/layout" component={ProLayout}></Route>
                {/* 
                <Route path="/modal" component={ProModal}></Route>
                <Route path="/query" component={QueryDemo}></Route>
                <Route path="/layout" component={ProLayout}></Route>
                <Route path="/select" component={ProSelectDemo}></Route>
                <Route path="/zoom" component={ZoomableDemo}></Route>
                <Route path="/import/base" component={DataImportBaseDemo}></Route>
                <Route path="/import/local" component={DataImportLocalDemo}></Route>
                <Route path="/flex" component={FlexLayout}></Route>
                <Route path="/center" component={CenterLayout}></Route>
                <Route path="/cropper" component={CropperImage}></Route> */}
                {/* <Route path="/chart" component={LegionsProEchartsChartPieDemo}></Route> */}
                {/* <Route component={Demo}/> */}
                {this.props.children}
                </React.Fragment>
                </Switch>
        );
    }
}
