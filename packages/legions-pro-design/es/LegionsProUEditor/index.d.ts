import { Component } from 'react';
interface IProps {
    /**
     *
     * UEditor 代码的路径
     * @type {string}
     * @memberof IProps
     */
    ueditorPath?: string;
    /**
     *UEditor 配置项
     *
     * @type {Object}
     * @memberof IProps
     */
    ueditorConfig?: Object;
    ueditorId: string;
    onReady: (ueditorInstance: any) => void;
    onChange?: (value: string) => void;
    onBlur?: (value: string) => void;
}
interface IState {
    /**
     *为了避免麻烦，每个编辑器实例都用不同的 id
     *
     * @type {string}
     * @memberof IState
     */
    randomId: string;
}
export default class LegionsProUEditor extends Component<IProps, IState> {
    static defaultProps: {
        editorConfig: {
            initialFrameHeight: number;
            autoHeightEnabled: boolean;
            toolbars: string[][];
        };
        ueditorPath: string;
    };
    /**
    *scriptTagStatus -> 0:代码未加载，1:两个代码依赖加载了一个，2:两个代码依赖都已经加载完成
    *
    * @type {number}
    * @memberof IState
    */
    scriptTagStatus: number;
    instance: any;
    constructor(props: any);
    componentDidMount(): void;
    onChange: () => void;
    onBlur: () => void;
    insertScriptTag(): void;
    initEditor(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
}
export {};
