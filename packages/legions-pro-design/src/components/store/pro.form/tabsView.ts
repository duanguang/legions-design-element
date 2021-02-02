/*
 * @Author: duanguang
 * @Date: 2021-01-28 16:13:01
 * @LastEditTime: 2021-01-29 17:53:54
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.form/tabsView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { InstanceForm } from '../../LegionsProForm/interface';
import { action,autorun,computed,observable } from 'mobx';
import { shortHash } from 'legions-lunar/object-hash';
export class TabsItemView{
    /** 每个tab拥有的自己独立的from实体 */
    formInstance: InstanceForm = null;
    keys: string = '';
    @observable private _style: React.CSSProperties = {};
    
    @observable private _className:string=''

    @observable private _closable:boolean=void 0
    @observable private _disabled:boolean=void 0
    constructor(key: string) {
        this.keys = key;
    }
    @computed get computedStyle() {
       return {style:this._style};
    }
    @computed get computedClassName() {
        if (this._className) {
            return {className:this._className};
        }
        return {};
    }
    @computed get computedClosable() {
        if (this._closable!==void 0) {
            return {closable:this._closable};
        }
        return {};
    }
    @computed get computedDisabled() {
        if (this._disabled!==void 0) {
            return {disabled:this._disabled};
        }
        return {};
    }
    @action setStyle(style:React.CSSProperties) {
        this._style = style;
    }
    @action setClassName(className:string) {
        this._className = className;
    }
    @action setClosable(closable:boolean) {
        this._closable = closable;
    }
    @action setDisabled(disabled:boolean) {
        this._disabled = disabled;
    }
}
export class TabsFormView{
    constructor() {
        this.activeTabKey =`${shortHash(new Date().getTime())}${0}`
        this._tabsMap.set(this.activeTabKey, new TabsItemView(this.activeTabKey))
    }
    /** 当前活跃的tab项 */
    @observable activeTabKey: string = null;

    /** 内部变量，外部请勿直接调用 */
    @observable private  _tabsMap = observable.map<string,TabsItemView>()

    
    @computed get computedTabs():TabsItemView[] {
        const value: TabsItemView[] = [];
        for (let item of this._tabsMap.values()) {
          value.push(item);
        }
        return value;
    }
    @computed get size() {
        return this._tabsMap.size;
    }
    @computed get entries() {
        return this._tabsMap.entries();
    }
    @action getTabs(key: string) {
        console.log(this._tabsMap);
        return this._tabsMap.get(key);
    }
    @action hasTabs(key: string) {
        return this._tabsMap.has(key);
    }
    @action getTabsKeys() {
        return this._tabsMap.keys();
    }
    /**
     * 删除tab
     * @param {string} key map中对应key值
     * @memberof DeliveryGoodsStore
     */
    @action delTabsMap(key: string) {
        this._tabsMap.delete(key)
    }
    /**
     * 添加tab
     * @param {boolean} switchTabKey 添加页签后是否立即切换到新增的页签
     * @param {number} index 下标，用于遍历新增页签时可能会导致uid重复
     * @param {() => void} callback 创建完成之后等待ui渲染完毕执行事件
     */
    @action addTabsMap(isSwitchTabKey: boolean = true, index: number = 0, callback?: () => void) {
        const uid = `${shortHash(new Date().getTime())}${index}`
        this._tabsMap.set(uid, new TabsItemView(`${uid}`))
        isSwitchTabKey && (this.activeTabKey = uid)
        /** 等待ui记载完毕根据托运责任设置订单服务类型 */
        setTimeout(() => {
            /** ui渲染完毕，执行回调 */
            callback && callback()
        }, 100)
        return uid
    }
}