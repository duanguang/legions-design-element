import React from 'react';
interface IProps {
    /** 弹窗内容区组件 */
    content: React.ReactNode;
    /** 模态框组件 */
    modal?: React.ReactNode;
    children?: any;
}
export declare class ProModalContext extends React.Component<IProps> {
    renderMobXProviderContext(): JSX.Element;
    renderContextType(): React.DetailedReactHTMLElement<any, HTMLElement>;
    render(): React.DetailedReactHTMLElement<any, HTMLElement>;
}
export {};
