import * as React from 'react';
import { IProPrintProps } from './interface';
/** 打印页面选定区域内容 */
export default class LegionsProPrint extends React.Component<IProPrintProps> {
    triggerRef: React.Ref<HTMLElement>;
    linkTotal: number;
    linksLoaded: Element[];
    linksErrored: Element[];
    componentDidMount(): void;
    startPrint: (target: any, onAfterPrint: any) => void;
    triggerPrint: (target: any) => void;
    handlePrint: () => void;
    setRef: (ref: any) => void;
    /** 根据屏幕DPI，计算A4尺寸 */
    getA4Size(): {
        a4w: number;
        a4h: number;
    };
    render(): React.ReactElement<import("./interface").ITriggerProps<unknown>, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)>) | (new (props: any) => React.Component<any, any, any>)>;
}
