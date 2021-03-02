import React from 'react';
import './style/index.less';
import * as H from 'history';
export interface ExceptionProps<L = {
    to: H.LocationDescriptor;
    href?: H.LocationDescriptor;
    replace?: boolean;
    innerRef?: (node: HTMLAnchorElement | null) => void;
}> {
    type: '403' | '404' | '500';
    title?: React.ReactNode;
    desc?: React.ReactNode;
    img?: string;
    actions?: React.ReactNode;
    linkElement?: string | React.ComponentType<L>;
    style?: React.CSSProperties;
    className?: string;
    backText?: React.ReactNode;
    redirect?: string;
}
export default class LegionsProException extends React.PureComponent<ExceptionProps> {
    static defaultProps: {
        backText: string;
        redirect: string;
    };
    constructor(props: any);
    render(): JSX.Element;
}
