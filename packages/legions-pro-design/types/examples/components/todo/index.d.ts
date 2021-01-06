import React from 'react';
import TodoStore from '../../stores/TodoStore';
interface ITodo {
    message: string;
    store?: TodoStore;
}
export default class Todo extends React.Component<ITodo> {
    constructor(props: any);
    componentDidMount(): void;
    render(): JSX.Element;
}
export {};
