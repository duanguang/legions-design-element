/**
  *  legions-pro-echarts v0.0.7
  * (c) 2021 duanguang
  * @license MIT
  */
import * as core from 'echarts/core';
export { core as echarts };

/*
 * @Author: duanguang
 * @Date: 2020-12-10 15:31:01
 * @LastEditTime: 2020-12-18 16:17:58
 * @LastEditors: duanguang
 * @Description:
 * @FilePath: /legions-design-element/packages/legions-pro-echarts/src/components/interface/interface.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
/**
 * echarts核心组件基础属性
 * @export
 * @class LegionsProEchartsPropsTypes
 * @template EchartOption
 */
var LegionsProEchartsPropsTypes = /** @class */ (function () {
    function LegionsProEchartsPropsTypes() {
        /** 事件集合 */
        this.onEvents = {};
        /** 是否显示加载状态 */
        this.loading = false;
        /** loading状态配置 */
        this.loadingOption = { maskColor: 'rgba(0, 0, 0, 0.2)', color: '#8dd5f5', textColor: '#fff', text: '' };
        /** 初始化附加参数 */
        this.opts = {};
        /** 容器样式 */
        this.style = {};
        /** 容器类名 */
        this.className = '';
        /** 由上层觉得是否需要setOption, 类似shouldComponentUpdate。默认为 true */
        this.shouldSetOption = function () { return true; };
        /** echarts 实例化完成后执行并抛出实例 */
        this.onChartReady = function () { };
    }
    return LegionsProEchartsPropsTypes;
}());

export { LegionsProEchartsPropsTypes };
