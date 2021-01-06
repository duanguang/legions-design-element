import React from 'react';
import './style/index.less';
interface ColumnProps<T> {
    title?: React.ReactNode;
    key?: string;
    dataIndex: string;
    render?: 'proportion' | ((text: any, record: T, index: number) => React.ReactNode);
    colSpan?: number;
    className?: string;
    children?: ColumnProps<T>[];
    tooltip?: boolean;
    offset?: number;
}
declare class IProps<T> {
    style?: React.CSSProperties;
    className?: string;
    dataSource: T[];
    /** 容器内联样式 */
    boxStyle?: React.CSSProperties;
    /** 容器标题渲染
     *
     * 当不传时，默认渲染表格列展示形式
     *
     * 传入字符串，则绑定字符串信息
     *
     * 传入React.ReactNode 则以自定义展示
     */
    boxTitle?: string | ColumnProps<T>[] | React.ReactNode;
    columns: ColumnProps<T>[];
    /**表格行 key 的取值，可以是字符串或一个函数
     *
     * 默认值key
     */
    rowKey: string | ((record: T, index: number) => string);
}
/** 可视化界面容器盒子列表组件 */
export declare class LegionsProEchartsBoxList<T = {}> extends React.Component<IProps<T>> {
    static defaultProps: Readonly<IProps>;
    renderContent(): JSX.Element[];
    renderProBoxTitle(): {} | null | undefined;
    render(): JSX.Element;
}
export {};
