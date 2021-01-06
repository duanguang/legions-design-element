import StoreBase, { IStoreBaseMeta } from '../../store/StoreBase';
import { MicroAppStateActions } from 'legions-micro-service/types/interfaces'
import { inject, resource, StoreModules } from 'legions/store';
import { IGlobalStates, IResource, IUserInfo } from '../../interface';
import HLTableStore from '../../store/pro.table';
import { IframePostMessage, masterEventScopes, subscribeLegionsProGlobal } from './globalStateEven';
import { MenuEntity } from '../../models/pro.menu.model';
interface IContext{
/*  UserInfoApp:UserInfoStore, */
}

interface IIGlobalStateEvent{
    name: string;
    scope: string;
}
/** 子应用全局数据基类 */
@StoreModules
export default class WorkerGlobalStateStore<IGlobalState,User={}> extends StoreBase<IContext>{
    static meta :IStoreBaseMeta={
        ...StoreBase.meta,
    }
    @inject(HLTableStore)
    private hlTableStore:HLTableStore
    userInfo: IUserInfo<User>;
    menuList: MenuEntity[] = [];
    masterEventScopes = masterEventScopes;
    /** 打开菜单页签方法 */
    openTabPane: IGlobalStates['methods']['openTabPane'] = () => { };
    /** 移除菜单页签方法 */
    removeTablePane: IGlobalStates['methods']['removeTablePane'] = () => { };
    private onGlobalStateChange: (callback:(value:IGlobalStates&IGlobalState,prev:IGlobalStates&IGlobalState,event:IIGlobalStateEvent)=>void,options:Parameters<MicroAppStateActions['onGlobalStateChange']>[1])=>void = null;
    setGlobalState: (state: IGlobalStates & IGlobalState,event: IIGlobalStateEvent) => void = null;
    /** postmessage 通信 */
    iframePostMessage = IframePostMessage;
    /** 订阅子应用iframe挂载在全局的变量 */
    private subscribeLegionsProGlobal = subscribeLegionsProGlobal;
    appId:string=''
    constructor(context:IContext){
        super(context);
    }
    listeningGlobalStateChange(options: {
        /** 监听事件队列数据 */
        eventScopes: IResource[],
        /** 监听回调执行函数 */
        callback: (value: IGlobalStates & IGlobalState,prev: IGlobalStates & IGlobalState,event: IIGlobalStateEvent) => void;
    }) {
        this.subscribeLegionsProGlobal((values) => {
            //@ts-ignore
            this.syncUpdateGlobalState(values);
            this.onGlobalStateChange( (value,prev,event)=> {
                if (!event && (value.user||value.methods)) {
                    this.setLayoutData(value);
                }
                if (options.callback && typeof options.callback === 'function') {
                    options.callback(value,prev,event);
                }
                if (process.env.NODE_ENV !== 'production') {
                    console.log(`[onGlobalStateChange - ${values.appId}]:`,value,prev,event)
                }
              },{
                  fireImmediately: true,
                  eventScopes:options.eventScopes,
              })
        })
    }
    private syncUpdateGlobalState(props: {
        onGlobalStateChange: MicroAppStateActions['onGlobalStateChange'],
        setGlobalState: MicroAppStateActions['setGlobalState'] 
        appId: string;
    }) {
        if (!this.onGlobalStateChange) {
            this.onGlobalStateChange = (callback,options) => {
                props.onGlobalStateChange(callback,options);
            };
        }
        if (!this.setGlobalState) {
            this.setGlobalState = (state,event) => {
                props.setGlobalState(state,event)
            };
        }
        this.appId = props.appId;
    }
    /** 写入用户数据 */
    private setUserInfo(user) {
        this.userInfo = user;
    }
    /** 写入基座系统相关方法及对象变量 */
    private setLayoutData(data:IGlobalStates) {
        if (data.user) {
            this.hlTableStore.userInfo = data.user;
            this.setUserInfo(data.user);
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