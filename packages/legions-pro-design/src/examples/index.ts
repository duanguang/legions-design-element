import  create from 'legions';
import App from './containers/App';
import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
import { legionsThirdpartyMap } from './constants/legionsConfig';
import ReactDOM from 'react-dom';
legionsThirdpartyPlugin.use([
    legionsThirdpartyMap.excel,
    legionsThirdpartyMap.clipboard,
    legionsThirdpartyMap.dexie,
]);
const app = create({enableDevTools:false,router: true,history:null});
app.start(App, '#react-lcm');
// @ts-ignore
if (module.hot&&process.env.NODE_ENV==='dev') {
    // @ts-ignore
    module.hot.accept();
}
