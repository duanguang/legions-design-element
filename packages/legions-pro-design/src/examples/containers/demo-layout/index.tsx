/*
 * @Author: duanguang
 * @Date: 2021-04-24 19:08:06
 * @LastEditTime: 2021-04-26 11:00:02
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/demo-layout/index.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import './index.less';
export class FlexLayout extends React.Component<{},{
    layout: {
        float: () => JSX.Element;
        flex: () => JSX.Element;
    }
}>{
    constructor(props) {
        super(props);
        this.state = {
            layout: {
                float: this.renderFloatLayout,
                flex:this.renderFlexLayout,
            }
        }
    }
    renderFloatLayout() {
        return <div className="demo-layout">
            <header>header</header>
            <div className="container">
                <div className="middle">
                    <h4>middle</h4>
                    <p>
                        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
                        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
                        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
                        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
                        middlemiddlemiddlemiddlemiddlemiddlemiddlemiddle
                        middlemiddlemiddlemiddlemiddle
                </p>
                </div>
                <div className="left">
                    <h4>left</h4>
                    <p>
                        leftleftleftleftleftleftleftleftleftleftleftleft
                        leftleftleftleftleftleftleftleftleftleftleftleft
                        leftleftleftleftleftleftleftleftleftleftleftleft
                </p>
                </div>
                <div className="right">
                    <h4>right</h4>
                    <p>
                        rightrightrightrightrightrightrightrightrightright
                        rightrightrightrightrightrightrightrightrightright
                        rightrightrightrightrightrightright
                </p>
                </div>
            </div>
            <footer>footer</footer>
        </div>
    }
    renderFlexLayout() {
        return <div className="flex-layout">
            <div className="header">这里是顶部栏</div>
            <div className="main">
                <div className="center">
                    <div className="left">这是左侧栏</div>
                    <div className="content">
                        <div className="page">
                            内容模块的宽度需要自适应，需要自动铺满。当顶部栏高度+内容模块高度+底部栏高度小于浏览器高度时，自动铺满。当顶部栏高度+内容模块高度+底部栏高度大于浏览器高度时，顶部栏一直处于浏览器顶端。内容模块跟底部栏处出现滚动条
                        </div>
                    </div>
                    <div className="right">这里是右侧栏</div>
                </div>
                <div className="footer">这是底部栏</div>
            </div>
        </div>
    }
    render() {
        return this.state.layout.flex()
    }
}