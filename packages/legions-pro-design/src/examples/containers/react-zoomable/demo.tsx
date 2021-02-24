/*
 * @Author: duanguang
 * @Date: 2021-02-24 14:43:43
 * @LastEditTime: 2021-02-24 14:44:38
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/react-zoomable/demo.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import Zoomable from './index';

export default class ZoomableDemo extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const testOption = {
            zoomable: {
                width: {
                    min: 200,//default 10 拉伸最小宽度
                    max: 500//default 1000 拉伸最大宽度
                },
                height: {
                    min: 300,//default 10 拉伸最小高度
                    max: 500//default 500 拉伸最大高度
                }
            },
            onZoomStart: (result) => {
                console.log("onZoomStart",result);
            },
            onZoomEnd: (result) => {
                console.log("onZoomEnd",result);
            },
            onZooming: (result) => {
                console.log("onZooming",result);
            }
        }
        //@ts-ignore
        return <Zoomable style={{ background: "blue" }} {...testOption}>
            <div>test</div>
        </Zoomable>;
    }
};