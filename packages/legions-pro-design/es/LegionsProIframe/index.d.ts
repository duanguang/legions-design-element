import React from 'react';
interface IProps {
    url: string;
    allowFullScreen?: boolean;
    position?: string;
    display?: string;
    height?: string;
    width?: string;
    styles?: object;
    name?: string;
    onLoad?: any;
    onMouseOver?: any;
    onMouseOut?: any;
    id?: string;
    sandbox?: string;
    allow?: string;
    className?: string;
    title?: string;
    ariaHidden?: boolean;
    /** 初次加载完成 */
    onFirstLoaded?: () => void;
}
declare const LegionsProIframe: {
    new (props?: IProps, context?: any): {
        componentWillMount(): void;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): React.DetailedReactHTMLElement<any, HTMLElement>;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: IProps) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => any): void;
        forceUpdate(callBack?: () => any): void;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<IProps>;
        state: Readonly<{}>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentWillReceiveProps?(nextProps: Readonly<IProps>, nextContext: any): void;
        shouldComponentUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<{}>, nextContext: any): void;
        componentWillUnmount?(): void;
    };
};
export default LegionsProIframe;
