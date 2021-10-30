import React from 'react';
import './index.less';
export declare class FlexLayout extends React.Component<{}, {
    layout: {
        float: () => JSX.Element;
        flex: () => JSX.Element;
    };
}> {
    constructor(props: any);
    renderFloatLayout(): JSX.Element;
    renderFlexLayout(): JSX.Element;
    render(): JSX.Element;
}
