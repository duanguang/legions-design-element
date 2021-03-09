/*
 * @Author: duanguang
 * @Date: 2021-01-28 16:13:01
 * @LastEditTime: 2021-03-09 10:38:43
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsStoreForm/tabsView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { InstanceProForm } from '../LegionsProForm/interface';
import { action,autorun,computed,observable } from 'mobx';
import { shortHash } from 'legions-lunar/object-hash';
import { IProTabsFormAddTabsMap } from './interface';
export class TabsItemView{
    /** 每个tab拥有的自己独立的from实体 */
    formInstance: InstanceProForm = null;
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
    constructor(uid:string) {
        this.activeTabKey = `${shortHash(new Date().getTime())}${0}`
        this._uid = uid;
        this._tabsMap.set(this.activeTabKey, new TabsItemView(this.activeTabKey))
    }
    @observable private _uid = '';
    /** 当前活跃的tab项 */
    @observable activeTabKey: string = null;

    /** 内部变量，外部请勿直接调用 */
    @observable private  _tabsMap = observable.map<string,TabsItemView>()

    /** tabs项数 内部私有变量 */
    @computed get _computedTabs():TabsItemView[] {
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
    private _geKeys(key: string) {
        const keys = `${key}${shortHash(`${key}${this._uid}`)}`;
        return keys;
    }
    @action getTabs(key: string) {
        const keys = this._geKeys(key);
        if (this._tabsMap.has(keys)) {
           return this._tabsMap.get(keys)
        }
        return this._tabsMap.get(key);
    }
    @action hasTabs(key: string) {
        const keys = this._geKeys(key);
        if (this._tabsMap.has(keys)) {
            return true;
        }
        if (this._tabsMap.has(key)) {
            return true;
        }
        return false;
    }
    @action getTabsKeys() {
        return this._tabsMap.keys();
    }
    @action clearTabs() {
        this.activeTabKey = '';
        this._tabsMap.clear();
    }
    /**
     * 删除tab
     * @param {string} key map中对应key值
     */
    @action delTabsMap(key: string) {
        this._tabsMap.delete(key)
    }
    /**
     * 添加tab页签
     * 
     * 内部私有方法
     */
    @action _addTabsMap(options?: IProTabsFormAddTabsMap['options']) {
        let uid = ''
        const option = options || {} as IProTabsFormAddTabsMap['options'];
        let isSwitchTabKey =  option.isSwitchTabKey===void 0?true:option.isSwitchTabKey;
        let key = option.key||'';
        if (key) { // 如果设定了固定key，则生成
            uid = `TabPane${key}${shortHash(`${key}${this._uid}`)}`
        } else {// 随机生成
            uid = `TabPane${shortHash(new Date().getTime())}${this._tabsMap.size}`
        }
        if (!this._tabsMap.has(uid)) {
            this._tabsMap.set(uid, new TabsItemView(`${uid}`))
        }
        isSwitchTabKey && (this.activeTabKey = uid)
        /** 等待ui记载完毕根据托运责任设置订单服务类型 */
        setTimeout(() => {
            /** ui渲染完毕，执行回调 */
            option.callback && option.callback()
        }, 100)
        return uid
    }
}