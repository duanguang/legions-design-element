/*
 * @Author: duanguang
 * @Date: 2018-04-27 20:06:00
 * @LastEditTime: 2020-12-24 21:39:21
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/tests/shared/demoTest.js
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import glob from 'glob';
import { render } from 'enzyme';
import MockDate from 'mockdate';

export default function demoTest(component, options = {}) {
  const files = glob.sync(`./components/${component}/demo/*.md`);
  files.forEach((file) => {
    let testMethod = options.skip === true ? test.skip : test;
    if (Array.isArray(options.skip) && options.skip.some(c => file.includes(c))) {
      testMethod = test.skip;
    }
    testMethod(`renders ${file} correctly`, () => {
      MockDate.set(new Date('2016-11-22').getTime() + (new Date().getTimezoneOffset() * 60 * 1000));
      const demo = require(`../.${file}`); // eslint-disable-line global-require, import/no-dynamic-require
      const wrapper = render(demo);
      expect(wrapper).toMatchSnapshot();
      MockDate.reset();
    });
  });
}
