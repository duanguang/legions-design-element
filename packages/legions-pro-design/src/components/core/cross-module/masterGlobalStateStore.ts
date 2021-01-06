/*
 * @Author: duanguang
 * @Date: 2021-01-05 13:57:53
 * @LastEditTime: 2021-01-06 13:56:31
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/core/cross-module/masterGlobalStateStore.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { initGlobalState } from 'legions-micro-service';
import { IframePostMessage, masterEventScopes, subscribeLegionsProGlobal } from './globalStateEven';
import { IGlobalStates, IResource, typeOpenPaneParames } from '../../interface';
import { StoreModules } from 'legions/store';
import StoreBase, { IStoreBaseMeta } from '../../store/StoreBase';
import { MicroAppStateActions } from 'legions-micro-service/types/interfaces';
import { MenuEntity } from '../../models/pro.menu.model';
interface IContext{
}

interface IIGlobalStateEvent{
    name: string;
    scope: string;
}

/** 主应用全局数据基类
 * 只在主应用调用
 */
@StoreModules
export class MasterGlobalStateStore extends StoreBase<IContext>{
    static meta :IStoreBaseMeta={
        ...StoreBase.meta,
    }
    private onGlobalStateChange: (callback:(value:IGlobalStates,prev:IGlobalStates,event:IIGlobalStateEvent)=>void,options:Parameters<MicroAppStateActions['onGlobalStateChange']>[1])=>void = null;
    constructor(context:IContext){
        super(context);
        const { onGlobalStateChange, setGlobalState,offGlobalStateChange } = initGlobalState({
            user: null,
        })
        this.onGlobalStateChange = onGlobalStateChange;
        this.setGlobalState = setGlobalState;
    }
    setGlobalState: (state: IGlobalStates,event: IIGlobalStateEvent) => void = null;
    openTabPane: (pane: typeOpenPaneParames) => void=()=>{}
    removeTablePane: (targetKey: string | string[]) => void;
    menuList: MenuEntity[] = [];
    /** 订阅子应用iframe挂载在全局的变量 */
    iframePostMessage = IframePostMessage;
    masterEventScopes = masterEventScopes;
    listeningGlobalStateChange(options: {
        /** 监听事件队列数据 */
        eventScopes: IResource[],
        /** 监听回调执行函数 */
        callback: (value: IGlobalStates,prev: IGlobalStates,event: IIGlobalStateEvent) => void;
    }) {
        this.onGlobalStateChange((value,prev,event) => {
            if (options.callback && typeof options.callback === 'function') {
                options.callback(value,prev,event);
            }
            if (process.env.NODE_ENV !== 'production') {
                console.log('[onGlobalStateChange - master]:',value,prev,event)
            }
        },{
            eventScopes:options.eventScopes,
        });
    }
    setUserGlobalState(state) {
        this.setGlobalState({
            user:state,
        },this.masterEventScopes.userEvent.created);
    }
}