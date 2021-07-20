/**
 * /*
 *
 * @format
 * @Author: duanguang
 * @Date: 2021-04-24 18:55:05
 * @LastEditTime: 2021-07-19 23:38:26
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/index.ts 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import create from 'legions';
import App from './containers/App';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { legionsThirdpartyMap } from './constants/legionsConfig';
/* const SocketIO = require('socket.io-client'); */

legionsThirdpartyPlugin.use([legionsThirdpartyMap.excel, legionsThirdpartyMap.clipboard, legionsThirdpartyMap.dexie]);
const app = create({ enableDevTools: false, router: true, history: null });
const a = [...[12, 13]];
console.log(a);
app.start(App, '#react-lcm');
// @ts-ignore
if (module.hot && process.env.NODE_ENV === 'dev') {
  // @ts-ignore
  module.hot.accept();
}
