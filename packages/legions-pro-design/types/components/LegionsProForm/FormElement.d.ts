import { WrappedFormUtils } from '../interface/antd';
import AbstractForm from './AbstractForm';
import { ProFormStore } from '../store/pro.form';
import { InstanceFormElement } from './interface/formElement';
export interface IFormElementProps {
    form: WrappedFormUtils;
    elementKey: string;
    /**
     * 表单生成的唯一uid，做回车切换时，可以把需要进行切换的组件都存储到此表单UID的HASH列表中，回车切换时会在hash列表中找寻组件
     *
     * @type {string}
     * @memberof IFormWithInputProps
     */
    formUid: string;
    store?: ProFormStore;
    /**
     * 组件类型
     *
     * @type {('input'|'textarea'|'button')}
     * @memberof IFormElementProps
     */
    elType?: 'input' | 'textarea' | 'button' | 'span' | '';
    /**
     * 此方法会抛回组件一些关键信息到上层组件
     *
     * @memberof IFormElementProps
     */
    onReady?: (instance: InstanceFormElement) => void;
    /**
     * 回车，下键触发时指定一个元素聚焦,如果不填写，默认就是下一个
     *
     * @type {string}
     * @memberof IFormElementProps
     */
    nextElementKey?: string | {
        formUid: string;
        nextElementKey: string;
    };
}
/**
 * 如果元素需要回车，或者上下键切换焦点，则一定要用此组件包裹
 *
 * @export
 * @class FormElement
 * @extends {AbstractForm<IFormElementProps>}
 */
export default class FormElement extends AbstractForm<IFormElementProps> {
    static defaultProps: {
        elType: string;
        nextElementKey: string;
    };
    timeId: number;
    uid: string;
    constructor(props: any);
    /**  注册元素键盘行为代理事件*/
    onLoadingKeyDown: Function;
    /**  处理重复注册代理事件行为，已经注册过的代理事件,不重复注册*/
    onkeyDownProxy: () => () => void;
    componentWillMount(): void;
    get formStore(): import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").HlFormView> & {
        elementList: import("../store/pro.form/interface").IObservableMap<string, import("../store/pro.form/interface").IElementList>;
        focusUid: string;
        enableEnterSwitch: boolean;
        nodeCount: number;
        controls: any[];
        errorReactNodeList: import("../store/pro.form/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        errorListView: import("../store/pro.form/interface").IObservableMap<string, import("./interface").IErrorView[]>;
        readonly computedErrorReactNodeList: import("../store/pro.form/interface").IObservableMap<string, import("brain-store-utils").ViewModel<import("../store/pro.form/proFormStore").ErrorViewModel> & {
            uid: string;
            validateStatus: "" | "error";
        }>;
        readonly computedAllElementList: string[];
        readonly computedErrorListView: import("./interface").IErrorView[];
        readonly styleSize: "default" | "small" | "table";
        readonly computedFormState: import("../store/pro.form/interface").IObservableMap<string, import("../store/pro.form/proFormStore").IFormState>;
        updateStyleSize: (size: "default" | "small" | "table") => void;
        collectErrorReactNode: (componentCode: string, errorUid: string) => void;
        setErrorErrorReactNodeList: (componentCode: string, errorListView: import("./interface").IErrorView[]) => void;
        handleIgnore: (componentCode: string, id: number) => void;
        addAllElementKeys: (keys: string) => void;
        initFormState: (name: string) => void;
        setFormState: (name: string, state: import("../store/pro.form/proFormStore").IFormState) => void;
    } & import("../store/pro.form/proFormStore").IOtherView;
    /**
     *
     *  查询下拉单选dom
     * @returns
     * @memberof FormElement
     */
    querySelectDom(type?: 'ant-select-selection--single' | 'ant-select-selection--multiple'): Element;
    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    onkeyDownSelelctMultiple(even: any): void;
    /**
     *  下拉单选 键盘事件拦截
     *
     * @param {*} even
     * @memberof FormElement
     */
    onKeyDownSelect(even: any): void;
    addElement(): void;
    render(): JSX.Element;
}
