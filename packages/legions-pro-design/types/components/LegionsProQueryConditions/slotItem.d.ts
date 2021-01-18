import React from 'react';
interface IProps {
    width?: number;
    style?: React.CSSProperties;
    name?: string;
}
export default class SlotItem extends React.Component<IProps> {
    render(): JSX.Element;
}
export {};
