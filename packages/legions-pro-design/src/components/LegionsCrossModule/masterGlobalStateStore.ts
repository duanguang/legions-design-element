/*
 * @Author: duanguang
 * @Date: 2021-01-05 13:57:53
 * @LastEditTime: 2022-02-28 17:10:26
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsCrossModule/masterGlobalStateStore.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { initGlobalState } from 'legions-micro-service';
import { IframePostMessage,masterEventScopes,subscribeLegionsProGlobal } from './globalStateEven';
import { resource,StoreModules } from 'legions/store';
import LegionsStore from '../LegionsStore';
import { legionsStoreInterface } from '../LegionsStore/interface'
import { MicroAppStateActions } from 'legions-micro-service/types/interfaces';
import { legionsProLayoutInterface } from '../LegionsProLayout/interface'
import {legionsCrossModuleInterface} from './interface'
interface IContext {
}



/** 主应用全局数据基类
 * 只在主应用调用
 */
@StoreModules
export class MasterGlobalStateStore extends LegionsStore.StoreBase<IContext>{
    static meta: legionsStoreInterface['storeBaseMeta'] = {
        ...LegionsStore.StoreBase.meta,
    }
    /** 创建主应用事件 */
    static createEventScopes(event_key: string) {
        return resource(`master/resource/${event_key}`);
    }
    //@ts-ignor
    private onGlobalStateChange: (callback: (value: legionsProLayoutInterface['GlobalStates'],prev: legionsProLayoutInterface['GlobalStates'],event: legionsCrossModuleInterface['GlobalStateEvent']) => void,options: Parameters<MicroAppStateActions['onGlobalStateChange']>[1]) => void = null;
    setGlobalState: <state = {}>(state: legionsProLayoutInterface['GlobalStates'] & state,event: legionsCrossModuleInterface['GlobalStateEvent']) => void = null;
    openTabPane: (pane: legionsProLayoutInterface['openPaneParames']) => void = () => { }
    removeTablePane: (targetKey: string | string[]) => void = () => { };
    menuList: legionsProLayoutInterface['menuList'] = [];
    /** 订阅子应用iframe挂载在全局的变量 */
    iframePostMessage = IframePostMessage;
    //@ts-ignore
    masterEventScopes = masterEventScopes;
    constructor(context: IContext) {
        super(context);
        const { onGlobalStateChange,setGlobalState,offGlobalStateChange } = initGlobalState({
            user: null,
        })
        //@ts-ignore
        this.onGlobalStateChange = onGlobalStateChange;
        this.setGlobalState = setGlobalState;
    }
    listeningGlobalStateChange(options: {
        /** 监听事件队列数据 */
        eventScopes: legionsStoreInterface['resource'][],
        /** 监听回调执行函数 */
        callback: (value: legionsProLayoutInterface['GlobalStates'],prev: legionsProLayoutInterface['GlobalStates'],event: legionsCrossModuleInterface['GlobalStateEvent']) => void;
    }) {
        this.onGlobalStateChange((value,prev,event) => {
            if (options.callback && typeof options.callback === 'function') {
                options.callback(value,prev,event);
            }
            if (process.env.NODE_ENV !== 'production') {
                console.log('[onGlobalStateChange - master]:',value,prev,event)
            }
        },{
            eventScopes: options.eventScopes,
        });
    }
    setUserGlobalState(state) {
        this.setGlobalState({
            user: state,
        },this.masterEventScopes.userEvent.created);
    }
}