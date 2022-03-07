/*
 * @Author: duanguang
 * @Date: 2021-01-08 15:19:23
 * @LastEditTime: 2022-03-06 22:38:27
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProConditions/ProConditionsUtils.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import React from 'react';
import { getInjector } from 'legions/store';

import { shortHash } from 'legions-lunar/object-hash';
import {ProConditions} from './interface'



export class ConditionSelectModel {
    constructor(public container: ProConditions['config_container'],
        public props: ProConditions['component_props']['select']) {

    }
}
export class ConditionTextNumberModel{
    constructor(public container:ProConditions['config_container'],
        public props: ProConditions['component_props']['textNumber']) {
    }
}
export class ConditionRadioButtonModel{
    constructor(public container:ProConditions['config_container'],
        public props: ProConditions['component_props']['radioButton']) {
    }
}
export class ConditionTextAreaModel{
    constructor(public container:ProConditions['config_container'],
        public props: ProConditions['component_props']['textArea']) {
    }
}
export class ConditionTextModel{
    constructor(public container:ProConditions['config_container'],
        public props: ProConditions['component_props']['text']) {
    }
}
export class ConditionDateModel{
    constructor(public container: ProConditions['config_container'],
        public props: ProConditions['component_props']['date']) {
    }
}

export class ConditionSearchModel{
    constructor(
        public container:ProConditions['config_container'],
        public props: ProConditions['component_props']['search']) {
    }
}
export class ConditionRangePickerModel{
    constructor(public container:ProConditions['config_container'],
        public props: ProConditions['component_props']['rangePicker']) {
    }
}
export class ConditionCheckBoxModel{
    constructor(public container:ProConditions['config_container'],
        public props: ProConditions['component_props']['checkBox']) {
    }
}
export class ConditionGroupCheckBoxModel{
    constructor(public container:ProConditions['config_container'],
        public props: ProConditions['component_props']['groupCheckBox']) {
    }
}

export interface IProConditions {
    componentModel: ConditionSelectModel | ConditionTextNumberModel | ConditionRadioButtonModel | ConditionTextAreaModel |
    ConditionTextModel | ConditionDateModel | ConditionRangePickerModel |ConditionSearchModel|ConditionGroupCheckBoxModel
}
type componentConfigType<T> = T extends  ProConditions['config_types'] ? ProConditions['configs'][T]: {}

export class ProConditionsBase<Store,global = {}>{

    readonly global: global = null
    readonly mobxStore: Store = null
    constructor(options?: {
        store?: any,
        global?: global
    }) {
        // super()
        if (options) {
            if (options.global) {
                this.global = options.global
            }
            if (options.store) {

            }
            if (typeof options.store === 'function' && options.store.meta) {
                const stores = getInjector()
                this.mobxStore = stores.getState(options.store);
            }
        }

    }
    private createUid(name:string) {
       const timeId = new Date().getTime()
        const uid = `${name}-${shortHash(`${timeId}${name}`)}`
        return uid;
    }
    private createContainerProps(props: ProConditions['config_container']) {
        const id = props.name;
        if (!this[id]) {
            return {...props,uuid:this.createUid(id)}
        }
        return this[id]['container'];
    }
    private configs = {
        text: this.renderTextConfig.bind(this),
        checkBox: this.renderCheckBoxConfig.bind(this),
        groupCheckBox: this.renderGroupCheckBoxConfig.bind(this),
        rangePicker: this.renderRangePickerConfig.bind(this),
        date: this.renderDateConfig.bind(this),
        select: this.renderSelectConfig.bind(this),
        textNumber: this.renderTextNumberConfig.bind(this),
        radioButton: this.renderRadioButtonConfig.bind(this),
        textArea: this.renderTextAreaConfig.bind(this),
        search: this.renderSearchConfig.bind(this),
    }
    getConditionsConfig(componentConfigKey: string): IProConditions['componentModel'] {
        return this[componentConfigKey]
    }
    renderConfig<T extends ProConditions['config_types']>(type: T,options: componentConfigType<T>) {
        //@ts-ignore
        return this.configs[type](options)
    }
    
    private renderSelectConfig(options: ProConditions['configs']['select']): ConditionSelectModel {
        const id = options.container.name;
        this[id] = new ConditionSelectModel(this.createContainerProps(options.container),options.props)
        return this[id];
    }
    private renderTextNumberConfig(options: ProConditions['configs']['textNumber']): ConditionTextNumberModel {
        const id = options.container.name;
        this[id] = new ConditionTextNumberModel(this.createContainerProps(options.container),options.props)
        return this[id];
    }
    private renderRadioButtonConfig(options: ProConditions['configs']['radioButton']): ConditionRadioButtonModel {
        const id = options.container.name;
        this[id] = new ConditionRadioButtonModel(this.createContainerProps(options.container),options.props)
        return this[id];
    }
    private renderTextAreaConfig(options: ProConditions['configs']['textArea']): ConditionTextAreaModel {
        const id = options.container.name;
        this[id] = new ConditionTextAreaModel(this.createContainerProps(options.container),options.props)
        return this[id];
    }
    private renderTextConfig(options: ProConditions['configs']['text']): ConditionTextModel {
        const id = options.container.name;
        this[id] = new ConditionTextModel(this.createContainerProps(options.container),options.props)
        return this[id];
    }
    private renderDateConfig(options: ProConditions['configs']['date']): ConditionDateModel {
        const id = options.container.name;
        this[id] = new ConditionDateModel(this.createContainerProps(options.container),options.props)
        return this[id];
    }
    private renderRangePickerConfig(options: ProConditions['configs']['rangePicker']): ConditionRangePickerModel {
        const id = options.container.name;
        this[id] = new ConditionRangePickerModel(this.createContainerProps(options.container),options.props)
        return this[id];
    }
    private renderCheckBoxConfig(options: ProConditions['configs']['checkBox']): ConditionCheckBoxModel {
        const id = options.container.name;
        this[id] = new ConditionCheckBoxModel(this.createContainerProps(options.container),options.props)
        return this[id];
    }
    private renderGroupCheckBoxConfig(options: ProConditions['configs']['groupCheckBox']): ConditionGroupCheckBoxModel {
        const id = options.container.name;
        this[id] = new ConditionGroupCheckBoxModel(this.createContainerProps(options.container),options.props)
        return this[id];
    }
    private renderSearchConfig(options: ProConditions['configs']['search']): ConditionSearchModel {
        const id = options.container.name;
        this[id] = new ConditionSearchModel(this.createContainerProps(options.container),options.props)
        return this[id];
    }
}

