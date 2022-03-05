import LegionsStore from '../LegionsStore';
import { legionsStoreInterface } from '../LegionsStore/interface'
import { MicroAppStateActions } from 'qiankun'
import { inject, resource, StoreModules } from 'legions/store';
import LegionsProTable from '../LegionsProTable';
import { IframePostMessage, masterEventScopes, subscribeLegionsProGlobal } from './globalStateEven';
import { legionsProLayoutInterface } from '../LegionsProLayout/interface'
import {legionsCrossModuleInterface} from './interface'
interface IContext{
/*  UserInfoApp:UserInfoStore, */
}

interface InterfaceUer<U>{
    userName: string;
    userUid: string;
    companyName?: string;
    companyUid?: string;
    /** 接口返回的原始用户信息 */
    rowData?: U;
}
/** 子应用全局数据基类 */
@StoreModules
export default class WorkerGlobalStateStore<IGlobalState,User={}> extends LegionsStore.StoreBase<IContext>{
    static meta :legionsStoreInterface['storeBaseMeta']={
        ...LegionsStore.StoreBase.meta,
    }
    /** 创建微应用事件 */
    static createEventScopes(event_key: string) {
        return resource(`worker/resource/${event_key}`);
    }
    @inject(LegionsProTable['store'])
    private proTableStore: InstanceType<typeof LegionsProTable['store']>
    private userInfo: InterfaceUer<User>;
    private menuList: legionsProLayoutInterface['menuList'] = [];
    /** 监听全局数据，发生改变时触发,最基础监听函数 */
    protected onGlobalStateChange: (callback:(value:legionsProLayoutInterface['GlobalStates']&IGlobalState,prev:legionsProLayoutInterface['GlobalStates']&IGlobalState)=>void,options:Parameters<MicroAppStateActions['onGlobalStateChange']>[1])=>void = null;
    /**订阅子应用iframe挂载在全局的变量 */
    protected subscribeLegionsProGlobal = subscribeLegionsProGlobal;
    
    //@ts-ignore
    public masterEventScopes = masterEventScopes;
    /** 打开菜单页签方法 */
    openTabPane: legionsProLayoutInterface['GlobalStates']['methods']['openTabPane'] = () => { };
    /** 移除菜单页签方法 */
    removeTablePane: legionsProLayoutInterface['GlobalStates']['methods']['removeTablePane'] = () => { };
    /** 更新全局数据方法
     * 此函数在执行时，微应用全局监听事件都会接收到数据变化通知。 譬如listeningSanboxGlobalStateChange
     */
    setGlobalState: (state: legionsProLayoutInterface['GlobalStates'] & IGlobalState) => void = null;
    /** postmessage 通信 */
    iframePostMessage = IframePostMessage;
    /** 微应用id */
    appId:string=''
    constructor(context:IContext){
        super(context);
    }
    get user() {
        return this.userInfo
    }
    get menu_data() {
        return this.menuList
    }
    /** 全局数据变化监听函数，主要用于沙箱微应用环境 */
    listeningSanboxGlobalStateChange(options: {
        props:{
            onGlobalStateChange: (callback:(value:any,prev:any,event:legionsCrossModuleInterface['GlobalStateEvent'])=>void,options:Parameters<MicroAppStateActions['onGlobalStateChange']>[1])=>void;
            setGlobalState: (state: any,event: legionsCrossModuleInterface['GlobalStateEvent']) => void;
            name?: string;
        },
        /** 监听回调执行函数 */
        callback: (value: legionsProLayoutInterface['GlobalStates'] & IGlobalState,prev: legionsProLayoutInterface['GlobalStates'] & IGlobalState) => void;
    }) {
        //@ts-ignore
        this._syncUpdateGlobalState(options.props);
        this.onGlobalStateChange((value,prev) => {
            if ((value.user||value.methods)) {
                this._setLayoutData(value);
            }
            if (options.callback && typeof options.callback === 'function') {
                options.callback(value,prev);
            }
          },true)
    }
    /** 监听广播数据(主要用于基座跟子应用不在同一个容器，比如iframe) */
    listeningIframeGlobalStateChange(options: {
        /** 监听事件队列数据 */
        eventScopes: legionsStoreInterface['resource'][],
        /** 监听回调执行函数 */
        callback: (value: legionsProLayoutInterface['GlobalStates'] & IGlobalState,prev: legionsProLayoutInterface['GlobalStates'] & IGlobalState) => void;
    }) {
        this.subscribeLegionsProGlobal((values) => {
            //@ts-ignore
            this._syncUpdateGlobalState(values);
            this.onGlobalStateChange( (value,prev)=> {
                if ((value.user||value.methods)) {
                    this._setLayoutData(value);
                }
                if (options.callback && typeof options.callback === 'function') {
                    options.callback(value,prev);
                }
                if (process.env.NODE_ENV !== 'production') {
                    console.log(`[onGlobalStateChange - ${values.appId}]:`,value,prev)
                }
              },false)
        })
    }
    private _syncUpdateGlobalState(props: {
        onGlobalStateChange: MicroAppStateActions['onGlobalStateChange'],
        setGlobalState: MicroAppStateActions['setGlobalState'] 
        name: string;
    }) {
        if (!this.onGlobalStateChange) {
            this.onGlobalStateChange = (callback,options) => {
                props.onGlobalStateChange(callback,options);
            };
        }
        if (!this.setGlobalState) {
            this.setGlobalState = (state) => {
                props.setGlobalState(state)
            };
        }
        this.appId = props.name;
    }
    /** 写入用户数据 */
    private _setUserInfo(user) {
        this.userInfo = user;
    }
    /** 写入基座系统相关方法及对象变量 */
    private _setLayoutData(data:legionsProLayoutInterface['GlobalStates']) {
        if (data.user) {
            this.proTableStore.userInfo = data.user;
            this._setUserInfo(data.user);
        }
        if (data.methods) {
            if (data.methods.openTabPane) {
                this.openTabPane = data.methods.openTabPane;
            }
            if (data.methods.removeTablePane) {
                this.removeTablePane = data.methods.removeTablePane;
            }
        }
        if (data.menuList) {
            this.menuList = data.menuList;
        }
    }
}