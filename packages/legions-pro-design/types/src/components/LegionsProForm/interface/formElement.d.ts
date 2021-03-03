import LegionsStoreForm from '../../LegionsStoreForm';
export interface InstanceFormElement {
    store: InstanceType<typeof LegionsStoreForm>;
    /**
     * FormElement 组件唯一UID 自动生成
     *
     * @type {string}
     * @memberof InstanceFormElement
     */
    uid: string;
}
