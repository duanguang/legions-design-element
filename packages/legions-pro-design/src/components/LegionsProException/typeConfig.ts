/*
 * @Author: duanguang
 * @Date: 2020-12-26 11:01:56
 * @LastEditTime: 2020-12-26 11:04:00
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProException/typeConfig.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
const NoAccess = require('../assets/images/wZcnGqRDyhPOEYFcZDnb.png')
const NoFound = require('../assets/images/KpnpchXsobRgLElEozzI.png')
const ServerError = require('../assets/images/RVRUAYdCGeYNBWoKiIwB.png')
const config = {
    403: {
      img: NoAccess,
      title: '403',
      desc: '抱歉，你无权访问该页面',
    },
    404: {
      img: NoFound,
      title: '404',
      desc: '抱歉，你访问的页面不存在',
    },
    500: {
      img: ServerError,
      title: '500',
      desc: '抱歉，服务器出错了',
    },
  };
  
export default config;