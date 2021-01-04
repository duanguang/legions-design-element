/*
 * @Author: duanguang
 * @Date: 2020-12-22 16:33:23
 * @LastEditTime: 2021-01-04 16:24:43
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/script/setup.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import Adapter from 'enzyme-adapter-react-16';
import { configure } from 'enzyme';

// refs only work with mount, yes.

configure({
    //@ts-ignore
  adapter: new Adapter(),
  disableLifecycleMethods: false,
});
