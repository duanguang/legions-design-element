/*
 * @Author: duanguang
 * @Date: 2021-04-24 19:08:06
 * @LastEditTime: 2021-04-30 11:47:29
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/demo-center/index.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import './index.less';
export class CenterLayout extends React.Component<{},{
    layout: {
        1: () => JSX.Element;
        2: () => JSX.Element;
        3: () => JSX.Element;
        4: () => JSX.Element;
        5: () => JSX.Element;
    }
}>{
    constructor(props) {
        super(props);
        this.state = {
            layout: {
                1: this.renderCenterLayout,
                2: this.renderCenterLayout1,
                3:this.renderCenterLayout2,
                4:this.renderCenterLayout3,
                5:this.renderCenterLayout4,
            }
        }
    }
    renderCenterLayout() {
        return <div className="demo-layout1">
            <div className="inner">hello world</div>
        </div>
    }
    renderCenterLayout1() {
        return <div className="demo-layout2">
            <div className="inner">hello world</div>
        </div>
    }
    renderCenterLayout2() {
        return <div className="demo-layout3">
            <div className="inner">hello world</div>
        </div>
    }
    renderCenterLayout3() {
        return <div className="demo-layout4">
            <div className="inner">hello world</div>
        </div>
    }
    renderCenterLayout4() {
        return <div className="demo-layout5">
            <div className="inner">hello world</div>
        </div>
    }
    render() {
        return <div className="demo-center">
            {this.state.layout[5]()}11
        </div>
    }
}