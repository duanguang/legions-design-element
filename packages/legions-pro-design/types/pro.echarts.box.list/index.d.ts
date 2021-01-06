import React from 'react';
import './index.less';
declare class IProps {
    style?: React.CSSProperties;
    className?: string;
    data: {
        serialNumber?: number;
        title: string;
        /** 所占百分比 */
        proportion?: number;
        /** 总量 */
        toal?: number;
    }[];
}
/** 可视化界面容器盒子列表组件 */
export default class LegionsProEchartsBoxList extends React.Component<IProps> {
    static defaultProps: Readonly<IProps>;
    render(): JSX.Element;
}
export {};
