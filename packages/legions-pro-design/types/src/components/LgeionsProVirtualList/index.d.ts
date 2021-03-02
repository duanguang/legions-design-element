import React from 'react';
import PropTypes from 'prop-types';
interface IOptions {
    container: React.DOMElement<any, any>;
    initialState: {
        firstItemIndex: number;
        lastItemIndex: number;
    };
}
interface IState {
    firstItemIndex: number;
    lastItemIndex: number;
}
interface IProps {
    items: [];
    itemHeight: number;
    itemBuffer: number;
}
declare const LegionsProVirtualList: (options?: IOptions, mapVirtualToProps?: ({ items, itemHeight, }: {
    items: any;
    itemHeight: any;
}, { firstItemIndex, lastItemIndex, }: {
    firstItemIndex: any;
    lastItemIndex: any;
}) => {
    virtual: {
        items: any;
        style: {
            height: number;
            paddingTop: number;
            boxSizing: string;
        };
    };
}) => (InnerComponent: any) => {
    new (props: any): {
        _isMounted: boolean;
        domNode: any;
        options: IOptions;
        componentWillMount(): void;
        componentDidMount(): void;
        componentWillUnmount(): void;
        componentWillReceiveProps(nextProps: any): void;
        setStateIfNeeded(list: any, container: any, items: any, itemHeight: any, itemBuffer: any): void;
        refreshState(): void;
        render(): JSX.Element;
        context: any;
        setState<K extends "firstItemIndex" | "lastItemIndex">(state: IState | ((prevState: Readonly<IState>, props: Readonly<IProps>) => IState | Pick<IState, K>) | Pick<IState, K>, callback?: () => void): void;
        forceUpdate(callback?: () => void): void;
        readonly props: Readonly<IProps> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<IState>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<IProps>, prevState: Readonly<IState>): any;
        componentDidUpdate?(prevProps: Readonly<IProps>, prevState: Readonly<IState>, snapshot?: any): void;
        UNSAFE_componentWillMount?(): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<IProps>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): void;
    };
    propTypes: {
        items: PropTypes.Validator<any[]>;
        itemHeight: PropTypes.Validator<number>;
        itemBuffer: PropTypes.Requireable<number>;
    };
    defaultProps: {
        itemBuffer: number;
    };
    contextType?: React.Context<any>;
};
export default LegionsProVirtualList;
