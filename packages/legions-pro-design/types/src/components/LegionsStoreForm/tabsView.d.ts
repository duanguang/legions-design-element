/// <reference types="react" />
import { InstanceProForm } from '../LegionsProForm/interface';
import { IProTabsFormAddTabsMap } from './interface';
export declare class TabsItemView {
    /** 每个tab拥有的自己独立的from实体 */
    formInstance: InstanceProForm;
    keys: string;
    private _style;
    private _className;
    private _closable;
    private _disabled;
    constructor(key: string);
    get computedStyle(): {
        style: import("react").CSSProperties;
    };
    get computedClassName(): {
        className: string;
    } | {
        className?: undefined;
    };
    get computedClosable(): {
        closable: boolean;
    } | {
        closable?: undefined;
    };
    get computedDisabled(): {
        disabled: boolean;
    } | {
        disabled?: undefined;
    };
    setStyle(style: React.CSSProperties): void;
    setClassName(className: string): void;
    setClosable(closable: boolean): void;
    setDisabled(disabled: boolean): void;
}
export declare class TabsFormView {
    constructor(uid: string);
    private _uid;
    /** 当前活跃的tab项 */
    activeTabKey: string;
    /** 内部变量，外部请勿直接调用 */
    private _tabsMap;
    /** tabs项数 内部私有变量 */
    get _computedTabs(): TabsItemView[];
    get size(): number;
    get entries(): IterableIterator<import("mobx").IMapEntry<string, TabsItemView>>;
    private _geKeys;
    getTabs(key: string): TabsItemView;
    hasTabs(key: string): boolean;
    getTabsKeys(): IterableIterator<string>;
    clearTabs(): void;
    /**
     * 删除tab
     * @param {string} key map中对应key值
     */
    delTabsMap(key: string): void;
    /**
     * 添加tab页签
     *
     * 内部私有方法
     */
    _addTabsMap(options?: IProTabsFormAddTabsMap['options']): string;
}
