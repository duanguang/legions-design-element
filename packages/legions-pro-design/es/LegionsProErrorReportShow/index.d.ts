import { Component } from 'react';
import { ProFormStore } from '../store/pro.form';
import './style/index.less';
import { IErrorView } from '../LegionsProForm/interface';
interface IProps {
    store?: ProFormStore;
    errorClassName?: string;
    className?: string;
    /**
     *
     * 用于关联业务错误信息的唯一编码
     * @type {string}
     * @memberof IProps
     */
    code: string;
    /**
     *
     * 表单uid
     * @type {string}
     * @memberof IProps
     */
    formUid: string;
    onIgnoreError?: (item: IErrorView) => void;
}
interface IState {
}
export default class LegionsProErrorReportShow extends Component<IProps, IState> {
    timeId: number;
    uid: string;
    enumList: {
        1: string;
        2: string;
    };
    constructor(props: any);
    get viewForm(): import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").HlFormView> & {
        elementList: import("../store/pro.form/interface").IObservableMap<string, import("../store/pro.form/interface").IElementList>;
        focusUid: string;
        enableEnterSwitch: boolean;
        nodeCount: number;
        controls: any[];
        errorReactNodeList: import("../store/pro.form/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        errorListView: import("../store/pro.form/interface").IObservableMap<string, IErrorView[]>;
        readonly computedErrorReactNodeList: import("../store/pro.form/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        readonly computedAllElementList: string[];
        readonly computedErrorListView: IErrorView[];
        readonly styleSize: "small" | "table" | "default";
        readonly computedFormState: import("../store/pro.form/interface").IObservableMap<string, import("../store/pro.form/proFormStore").IFormState>;
        updateStyleSize: (size: "small" | "table" | "default") => void;
        collectErrorReactNode: (componentCode: string, errorUid: string) => void;
        setErrorErrorReactNodeList: (componentCode: string, errorListView: IErrorView[]) => void;
        handleIgnore: (componentCode: string, id: number) => void;
        addAllElementKeys: (keys: string) => void;
        initFormState: (name: string) => void;
        setFormState: (name: string, state: import("../store/pro.form/proFormStore").IFormState) => void;
    } & import("../store/pro.form/proFormStore").IOtherView;
    handleIgnore(item: IErrorView): void;
    renderContent(): JSX.Element;
    render(): JSX.Element;
}
export {};
