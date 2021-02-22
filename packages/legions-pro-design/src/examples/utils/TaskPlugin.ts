/*
 * @Author: duanguang
 * @Date: 2021-02-22 11:54:11
 * @LastEditTime: 2021-02-22 11:54:25
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/utils/TaskPlugin.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { WebSocketUtil} from 'legions/socket'
import { Modal } from 'antd';
import { getSystem } from '../constants/httpConfig';
import { getCookie } from '../../common/utils/cookie';
import { MapperEntity } from 'json-mapper-object';
import { ExportTaskEntity } from 'examples/models/ExportTaskEntity';
let modalRef = null
const TaskPlugin = {
    install(options: { url: string; token: string; taskApi: string; userId:number; callback: (data:ExportTaskEntity[]) => void}) {
        // @ts-ignore
        // tslint:disable-next-line: no-parameter-reassignment
        options = options || {};
        options.url=options.url||'';

        // tslint:disable-next-line: only-arrow-functions tslint:disable-next-line: typedef
        let getToken= function (options) {
            options.token = options.token||getCookie();
            if(process.env.NODE_ENV !== 'dev'){
                options.token=getCookie();
            }
            return options.token;
        }
        if (options.url) {
            // @ts-ignore
            const authValue = { token: getToken(options),taskApi: options.taskApi,userId:options.userId }

            WebSocketUtil.registerInstanceWebSocket(options.url,authValue);// 初始化连接
            WebSocketUtil.receiveMessage(options.url,(result) => {
                if (typeof result === 'object'&&result['taskEntity']) {
                    const newResult = JSON.parse(result['taskEntity'])
                    if (newResult && newResult['ok']) {
                        const data: ExportTaskEntity[] = newResult['data'];
                        const newData = data.map((item) => {
                            return MapperEntity(ExportTaskEntity, item);
                        })
                        options.callback&&options.callback(newData)
                    }

                }
            })
            /** 抛出sendMessage，方便在其他地方调用 */
            TaskPlugin.sendMessage = () => WebSocketUtil.sendMessage(options.url, authValue)
            const time = 30000
            setInterval(()=> {
                WebSocketUtil.sendMessage(options.url, authValue)
            },time)

        }
    },
    sendMessage: () => void 0,
}
export default TaskPlugin
