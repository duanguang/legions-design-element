import React from 'react';
export default class Demo extends React.Component<{}, {
    username: string;
}> {
    noContrl: React.RefObject<HTMLInputElement>;
    constructor(props: any);
    componentWillMount(): void;
    render(): JSX.Element;
}
