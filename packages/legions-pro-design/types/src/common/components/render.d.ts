declare const brain: (options: any) => {
    _history: any;
    _stores: any;
    use: (hooks: any) => void;
    start: (componentClass: any, container: any) => (extraProps: any) => JSX.Element;
};
export default brain;
