import { ProConditions } from './interface';
export declare class ConditionSelectModel {
    container: ProConditions['config_container'];
    props: ProConditions['component_props']['select'];
    constructor(container: ProConditions['config_container'], props: ProConditions['component_props']['select']);
}
export declare class ConditionTextNumberModel {
    container: ProConditions['config_container'];
    props: ProConditions['component_props']['textNumber'];
    constructor(container: ProConditions['config_container'], props: ProConditions['component_props']['textNumber']);
}
export declare class ConditionRadioButtonModel {
    container: ProConditions['config_container'];
    props: ProConditions['component_props']['radioButton'];
    constructor(container: ProConditions['config_container'], props: ProConditions['component_props']['radioButton']);
}
export declare class ConditionTextAreaModel {
    container: ProConditions['config_container'];
    props: ProConditions['component_props']['textArea'];
    constructor(container: ProConditions['config_container'], props: ProConditions['component_props']['textArea']);
}
export declare class ConditionTextModel {
    container: ProConditions['config_container'];
    props: ProConditions['component_props']['text'];
    constructor(container: ProConditions['config_container'], props: ProConditions['component_props']['text']);
}
export declare class ConditionDateModel {
    container: ProConditions['config_container'];
    props: ProConditions['component_props']['date'];
    constructor(container: ProConditions['config_container'], props: ProConditions['component_props']['date']);
}
export declare class ConditionSearchModel {
    container: ProConditions['config_container'];
    props: ProConditions['component_props']['search'];
    constructor(container: ProConditions['config_container'], props: ProConditions['component_props']['search']);
}
export declare class ConditionRangePickerModel {
    container: ProConditions['config_container'];
    props: ProConditions['component_props']['rangePicker'];
    constructor(container: ProConditions['config_container'], props: ProConditions['component_props']['rangePicker']);
}
export declare class ConditionCheckBoxModel {
    container: ProConditions['config_container'];
    props: ProConditions['component_props']['checkBox'];
    constructor(container: ProConditions['config_container'], props: ProConditions['component_props']['checkBox']);
}
export declare class ConditionGroupCheckBoxModel {
    container: ProConditions['config_container'];
    props: ProConditions['component_props']['groupCheckBox'];
    constructor(container: ProConditions['config_container'], props: ProConditions['component_props']['groupCheckBox']);
}
export interface IProConditions {
    componentModel: ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel | ConditionTextModel | ConditionDateModel | ConditionRangePickerModel | ConditionSearchModel | ConditionGroupCheckBoxModel;
}
declare type componentConfigType<T> = T extends ProConditions['config_types'] ? ProConditions['configs'][T] : {};
export declare class ProConditionsBase<Store, global = {}> {
    readonly global: global;
    readonly mobxStore: Store;
    constructor(options?: {
        store?: any;
        global?: global;
    });
    private createUid;
    private createContainerProps;
    private configs;
    getConditionsConfig(componentConfigKey: string): IProConditions['componentModel'];
    renderConfig<T extends ProConditions['config_types']>(type: T, options: componentConfigType<T>): any;
    private renderSelectConfig;
    private renderTextNumberConfig;
    private renderRadioButtonConfig;
    private renderTextAreaConfig;
    private renderTextConfig;
    private renderDateConfig;
    private renderRangePickerConfig;
    private renderCheckBoxConfig;
    private renderGroupCheckBoxConfig;
    private renderSearchConfig;
}
export {};
