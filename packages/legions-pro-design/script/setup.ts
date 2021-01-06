/*
 * @Author: duanguang
 * @Date: 2020-12-22 16:33:23
 * @LastEditTime: 2020-12-22 17:02:53
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/__tests__/setup.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import Adapter from 'enzyme-adapter-react-15';
import { configure } from 'enzyme';

// refs only work with mount, yes.

configure({
    //@ts-ignore
  adapter: new Adapter(),
  disableLifecycleMethods: false,
});
