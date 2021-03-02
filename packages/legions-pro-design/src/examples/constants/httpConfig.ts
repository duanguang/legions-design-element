import { HttpConfigTest } from './http.test.config';
import { HttpConfigBeta } from './http.beta.config';
import { HttpConfigDev } from './http.dev.config';
import { HttpConfigPreBeta } from './http.dist.config';
import { getCookie } from '../../common/utils/cookie';
function getConfig() {
    if (process.env.environment === 'dist') {
        return HttpConfigPreBeta; // 预发布环境 执行指令yarn build:dist
    }
    else if (process.env.environment === 'production') {
        return HttpConfigBeta; // 生产环境 执行指令yarn build:prod
    }
    else if (process.env.environment === 'test') {
        return HttpConfigTest; // 测试环境 执行指令yarn build:test
    }
    else {
        return HttpConfigDev;// 开发环境 执行指令yarn dev
    }
}

export const HttpConfig = getConfig();
export const setHeaders = (url: string, option?: Object, cookie?: string) => {
    let cookies = cookie ? cookie : 'SESSION=e3bdf8a8-eae4-40b3-9da8-99152b5239f8'
    if (process.env.environment !== 'dev') {
        /* cookie 存储UCTOKEN为大写  需置换为小写(3pl接口使用) */
        cookies = (getCookie() || '').replace('UCTOKEN=', 'uctoken=')
    }
    let options = {
        'api-target': url,
        'api-cookie': cookies,
    }
    return option ? { ...options, ...option } : options
}
export const getLcmSystem = () => {
    return HttpConfig.domainLcm
}
export const getTmsSystem = () => {
    return HttpConfig.domainTms
}
/**
 * 3pl接口域名
 * 3pl接口cookie需设置为uctoken=
 */
export const get3plSystem = () => {
    return HttpConfig.domain3pl
}
export const getSystem = () => {
    let system = getCookie('SYSSOURCE');
    if (system === 'SCM') {
      return HttpConfig.domainScm;
    }
    return HttpConfig.domainScm;
};
  
export const getToken = () => {
    let cookie = getCookie();
    /** 普通cookie_token转为HL-Access-Token传递给网关，网关会自动携带到header发送给后端 */
    cookie = cookie.replace('cookie_token=', 'HL-Access-Token=')
    /** uctoken取cookie_token的值（scm特殊处理，不取cookie中的UCTOKEN） */
    cookie = `${cookie}; UCTOKEN=${getCookie('cookie_token')}`
    return process.env.environment !== 'dev'
    ? cookie
    :'SESSION=e3bdf8a8-eae4-40b3-9da8-99152b5239f8;'
}
export const SocketUrl =
  process.env.environment === 'production'
    ? 'https://bff.hoolinks.com'
    : 'https://test-bff.hoolinks.com';