import React from 'react';
/** 地图标点类型 */
export interface MapMarkerPointType {
    /** 标点位置 */
    position: [string | number, string | number];
    /** 标点提示 */
    title?: string;
}
declare class IProps {
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
    marker?: Array<MapMarkerPointType>;
    /**
     * 缩放比例
     * @type {number}
     * @memberof IProps
     */
    zoom?: number;
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
    src?: string;
    /**
     * 请求类型, 默认https，根据百度window['HOST_TYPE']所有参数类型设置，1表示http、2表示https
     * @type {string}
     * @memberof IProps
     */
    hostType?: string;
}
export default class LegionsProBaiduMap extends React.Component<IProps> {
    static defaultProps: Readonly<IProps>;
    /** 地图唯一标识 */
    uid: string;
    componentDidMount(): void;
    componentWillReceiveProps(nextProps: Readonly<IProps>): void;
    /** 创建地图 */
    createMap(props: Readonly<IProps>): void;
    /** 加载百度地图API */
    loadBaiduMapAPI(props: Readonly<IProps>): void;
    render(): JSX.Element;
}
export {};
