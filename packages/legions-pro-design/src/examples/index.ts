import  create from 'legions';
import App from './containers/App';
const app = create({enableDevTools:false,router: true,history:null});
app.start(App, '#react-lcm');

// @ts-ignore
if (module.hot&&process.env.NODE_ENV==='dev') {
    // @ts-ignore
    module.hot.accept();
}
