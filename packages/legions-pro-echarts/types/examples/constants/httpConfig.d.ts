export declare const HttpConfig: {
    gateWay: string;
    domainLcm: string;
    domainTms: string;
    domain3pl: string;
};
export declare const setHeaders: (url: string, option?: Object | undefined, cookie?: string | undefined) => {
    'api-target': string;
    'api-cookie': string;
};
export declare const getLcmSystem: () => string;
export declare const getTmsSystem: () => string;
/**
 * 3pl接口域名
 * 3pl接口cookie需设置为uctoken=
 */
export declare const get3plSystem: () => string;
