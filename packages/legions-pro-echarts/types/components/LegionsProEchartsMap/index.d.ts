import React from 'react';
import { LegionsProEchartsPropsTypes } from '../interface';
import { EffectScatterSeriesOption, LinesSeriesOption, MapSeriesOption } from 'echarts/charts';
import { GeoComponentOption } from 'echarts/components';
declare type MapOption = MapSeriesOption | LinesSeriesOption | EffectScatterSeriesOption | GeoComponentOption;
export declare class LegionsProEchartsMapProps extends LegionsProEchartsPropsTypes<MapOption> {
    /** 是否初始化世界地图, 默认true */
    initRegisterWorldMap?: boolean;
}
export default class LegionsProEchartsMap extends React.Component<LegionsProEchartsMapProps> {
    static defaultProps: Readonly<LegionsProEchartsMapProps>;
    static countryNameZh: any;
    static worldData: any;
    componentWillMount(): void;
    private get option();
    render(): JSX.Element;
}
export {};
