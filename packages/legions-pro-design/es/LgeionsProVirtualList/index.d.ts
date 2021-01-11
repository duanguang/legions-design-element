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
        setState<K extends "firstItemIndex" | "lastItemIndex">(state: IState | ((prevState: Readonly<IState>, props: IProps) => IState | Pick<IState, K>) | Pick<IState, K>, callback?: () => any): void;
        forceUpdate(callBack?: () => any): void;
        props: Readonly<{
            children?: React.ReactNode;
        }> & Readonly<IProps>;
        state: Readonly<IState>;
        context: any;
        refs: {
            [key: string]: React.ReactInstance;
        };
        shouldComponentUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): boolean;
        componentWillUpdate?(nextProps: Readonly<IProps>, nextState: Readonly<IState>, nextContext: any): void;
        componentDidUpdate?(prevProps: Readonly<IProps>, prevState: Readonly<IState>, prevContext: any): void;
    };
    propTypes: {
        items: PropTypes.Validator<any[]>;
        itemHeight: PropTypes.Validator<number>;
        itemBuffer: PropTypes.Requireable<number>;
    };
    defaultProps: {
        itemBuffer: number;
    };
};
export default LegionsProVirtualList;
