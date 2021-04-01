import React from 'react';
export default class Demo extends React.Component<{}, {
    username: string;
    val: number;
}> {
    noContrl: React.RefObject<HTMLInputElement>;
    constructor(props: any);
    componentWillMount(): void;
    componentDidMount(): void;
    render(): JSX.Element;
}
