/*
 * @Author: linzeqin
 * @Date: 2019-08-22 15:19:08
 * @description: 百度地图
 */
import React from 'react';
import { shortHash } from 'legions-lunar/object-hash';

/** ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
const AK: string = 'qGCNVaqaLys5IewTGcIuswUEtcAq0rp6';

/** 地图标点类型 */
export interface MapMarkerPointType {
    /** 标点位置 */
    position: [string | number,string | number];
    /** 标点提示 */
    title?: string;

}

class IProps {
    /**
     * 位置，经纬度 eg：['116.403847', '39.915526']，不传递则默认定位第一个标记点
     * @type {MapMarkerPointType['position']}
     * @memberof IProps
     */
    position?: MapMarkerPointType['position'];

    /**
     * 标记, 支持多个标记 eg：[['116.403847', '39.915526']]，默认北京天安门
     * @type {Array<MapMarkerPointType>}
     * @memberof IProps
     */
    marker?: Array<MapMarkerPointType> = [{
        position: ['116.403847','39.915526'],
        title: '天安门',
    }];

    /**
     * 缩放比例
     * @type {number}
     * @memberof IProps
     */
    zoom?: number = 16;

    /**
     * 自定义样式
     * @type {React.CSSProperties}
     * @memberof IProps
     */
    style?: React.CSSProperties;

    /**
     * 百度api脚本地址
     * @type {string}
     * @memberof IProps
     */
    src?: string = `https://api.map.baidu.com/getscript?v=2.0&ak=${AK}`

    /**
     * 请求类型, 默认https，根据百度window['HOST_TYPE']所有参数类型设置，1表示http、2表示https
     * @type {string}
     * @memberof IProps
     */
    hostType?: string = '2';
}

export default  class LegionsProBaiduMap extends React.Component<IProps> {
    static defaultProps: Readonly<IProps> = new IProps()

    /** 地图唯一标识 */
    uid: string = `BaiduMap-${shortHash(new Date().getTime())}`;

    componentDidMount() {
        this.loadBaiduMapAPI(this.props);
    }
    componentWillReceiveProps(nextProps: Readonly<IProps>) {
        if (nextProps !== this.props) {
            this.loadBaiduMapAPI(nextProps);
        }
    }
    /** 创建地图 */
    createMap(props: Readonly<IProps>) {
        const BMap = window['BMap'];
        /** 创建 */
        const map = new BMap.Map(this.uid);
        /** 不传position则默认定位到第一个标点 */
        if (props.position) {
            /** 定位 */
            const point = new BMap.Point(...props.position)
            /** 初始化缩放 */
            map.centerAndZoom(point,props.zoom);
        } else {

            /** 定位 */
            //@ts-ignore
            const point = new BMap.Point(...props.marker[0].position)
            /** 初始化缩放 */
            map.centerAndZoom(point,props.zoom);
        }

        /** 启动鼠标滚轮事件 */
        map.enableScrollWheelZoom();
        /** 添加标尺 */
        const navControl = new BMap.NavigationControl({ anchor: 'BMAP_ANCHOR_TOP_LEFT',type: 'BMAP_NAVIGATION_CONTROL_LARGE' });
        map.addControl(navControl);
        //@ts-ignore
        props.marker.forEach(({ position,title }) => {
            const markerPoint = new BMap.Point(...position)
            /** 创建标注 */
            const marker = new BMap.Marker(markerPoint);
            /** 备注信息 */
            const label = new BMap.Label(title,{ offset: new BMap.Size(25,5) });
            /** 向标注上添加备注信息 */
            marker.setLabel(label);
            /** 方法addOverlay() 向地图中添加覆盖物 */
            map.addOverlay(marker);
        })

    }
    /** 加载百度地图API */
    loadBaiduMapAPI(props: Readonly<IProps>) {
        /** 设置host类型  */
        window['HOST_TYPE'] = this.props.hostType;
        // tslint:disable-next-line
        if (!window['BMap']) {
            const that = this;
            const script: HTMLScriptElement = document.createElement('script');
            //@ts-ignore
            script.src = this.props.src;
            // @ts-ignore
            script.onload = script.onreadystatechange = function () {
                //@ts-ignore
                if (!this.readyState || /^(loaded|complete)$/.test(this.readyState)) {
                    that.createMap(props);
                }
            }
            document.body.appendChild(script);
        } else {
            this.createMap(props);
        }
    }
    render() {
        return (
            <div
                id={this.uid}
                style={{
                    width: '100%',
                    height: '100%',
                    minHeight: '300px',
                    fontSize: '12px',
                    ...this.props.style,
                }}
            ></div>
        )
    }
}
