import { StoreManage } from 'brain-store';
declare const brain: (options: any) => {
    _history: any;
    _stores: StoreManage;
    use: (hooks: any) => void;
    start: (componentClass: any, container: any) => (extraProps: any) => JSX.Element;
};
export default brain;
