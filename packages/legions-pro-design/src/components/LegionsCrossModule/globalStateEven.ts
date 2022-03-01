/*
 * @Author: duanguang
 * @Date: 2021-01-04 11:17:55
 * @LastEditTime: 2022-02-28 17:03:17
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsCrossModule/globalStateEven.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { postMessage } from 'legions-utils-tool/dom';
import { MicroAppStateActions } from 'legions-micro-service/types/interfaces';
import { resource } from 'legions/store';
import { legionsCrossModuleInterface } from './interface';
function findWindow<T = {}>(name: string) {
    let LegionstValue: T | null = null;
    try {
        LegionstValue = window[name];
    } catch (e) {
      LegionstValue = null;
    }
    try {
        if (!LegionstValue) {
            LegionstValue = window.parent[name];
        }
    } catch (e) {
        console.warn('LegionstValue = window.parent[name]，赋值异常，可能是域不同')
    }
    return LegionstValue;
  }
function sendMessageToParentWin(options: {
    data: {
        /** 数据操作口令，用于区分 */
        cmd: string;
        value: any;
    };
    origin?: any;
}) {
    postMessage.sendMessageToParentWin(options);
}
function sendMessageToChildrenWin(options: {
    data: {
        /** 数据操作口令，用于区分 */
       cmd: string;
       value: any;
   };
   origin?: any;
   /** 子窗口id */
   childrenId: string;
}) {
    postMessage.sendMessageToChildrenWin(options);
}
const IframePostMessage = {
    sendMessageToParentWin,
    sendMessageToChildrenWin,
    receiveMessage:postMessage.receiveMessage
}
/** 订阅子应用iframe挂载在全局的变量 */
function subscribeLegionsProGlobal(callback: (value: {
    onGlobalStateChange: (callback:(value:any,prev:any,event:legionsCrossModuleInterface['GlobalStateEvent'])=>void,options:Parameters<MicroAppStateActions['onGlobalStateChange']>[1])=>void;
    setGlobalState: (state: any,event: legionsCrossModuleInterface['GlobalStateEvent']) => void;
    appId: string;
}) => void) {
    if (typeof callback === 'function') {
        let value = findWindow('LegionsProGlobal');
        if (value) {
            //@ts-ignore
            callback(value);
        } else {
            let count = 0;
            const timeid = setInterval(() => {
                value = findWindow('LegionsProGlobal');
                count++;
                if (value && count <= 60) {
                    count = 0;
                    //@ts-ignore
                    callback(value);
                    clearInterval(timeid)
                } 
                if (count > 60) {
                    count = 0;
                    console.groupCollapsed('获取全局数据超时,失败原因如下:')
                    console.error('可能没找到，请检查全局是否存在LegionsProGlobal!');
                    console.error('可能跨域，请检查模块间是否允许跨域');
                    console.groupEnd()
                    clearInterval(timeid)
                }
              }, 400);
        }
    }
}
const userEvent = resource('master/resource/user');
export const masterEventScopes = {
    userEvent
}
export { IframePostMessage,subscribeLegionsProGlobal };