/// <reference types="react" />
import { InstanceForm } from '../LegionsProForm/interface';
export declare class TabsItemView {
    /** 每个tab拥有的自己独立的from实体 */
    formInstance: InstanceForm;
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
    constructor();
    /** 当前活跃的tab项 */
    activeTabKey: string;
    /** 内部变量，外部请勿直接调用 */
    private _tabsMap;
    get computedTabs(): TabsItemView[];
    get size(): number;
    get entries(): IterableIterator<import("mobx").IMapEntry<string, TabsItemView>>;
    getTabs(key: string): TabsItemView;
    hasTabs(key: string): boolean;
    getTabsKeys(): IterableIterator<string>;
    /**
     * 删除tab
     * @param {string} key map中对应key值
     * @memberof DeliveryGoodsStore
     */
    delTabsMap(key: string): void;
    /**
     * 添加tab
     * @param {boolean} switchTabKey 添加页签后是否立即切换到新增的页签
     * @param {number} index 下标，用于遍历新增页签时可能会导致uid重复
     * @param {() => void} callback 创建完成之后等待ui渲染完毕执行事件
     */
    addTabsMap(isSwitchTabKey?: boolean, index?: number, callback?: () => void): string;
}
