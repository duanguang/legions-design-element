import ProFormStore from '../../store/pro.form';
export interface InstanceFormElement {
    store: ProFormStore;
    /**
     * FormElement 组件唯一UID 自动生成
     *
     * @type {string}
     * @memberof InstanceFormElement
     */
    uid: string;
}
