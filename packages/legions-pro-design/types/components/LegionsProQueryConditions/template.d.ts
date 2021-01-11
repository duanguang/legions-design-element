import React from 'react';
interface IProps {
    slot: string;
    width?: number;
}
export default class Template extends React.Component<IProps> {
    render(): JSX.Element;
}
export {};
