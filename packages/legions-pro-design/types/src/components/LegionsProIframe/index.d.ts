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
    new (props: IProps | Readonly<IProps>): {
        componentWillMount(): void;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): React.DetailedReactHTMLElement<any, HTMLElement>;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<IProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<IProps>, prevState: Readonly<{}>): any;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<IProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<IProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    new (props: IProps, context: any): {
        componentWillMount(): void;
        componentDidUpdate(): void;
        componentDidMount(): void;
        render(): React.DetailedReactHTMLElement<any, HTMLElement>;
        context: any;
        setState<K extends never>(state: {} | ((prevState: Readonly<{}>, props: Readonly<IProps>) => {} | Pick<{}, K>) | Pick<{}, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<IProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<{}>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<{}>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<IProps>, prevState: Readonly<{}>): any;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<IProps>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<IProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<{}>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<{}>, nextContext: any): void;
    };
    contextType?: React.Context<any>;
};
export default LegionsProIframe;
