/** 订单 - 订单状态 */
export declare const ORDER_STATUS_ENUM: Readonly<{
    '0': '待报价';
    '4': '待报价';
    '1': '待接单';
    '5': '待确认';
    '6': '进行中';
    '7': '待验收';
    '8': '已完成';
    '9': '已终止';
}>;
/** 订单 - 订单来源类 */
export declare class OrderSourceEnum {
    /** 基础来源组 */
    static readonly SOURCE_ENUM: {
        '1': '货主下单';
        '2': '代客户下单';
        '3': '运价下单';
        '4': '货盘下单';
        '5': '套餐下单';
        '6': '境岸通';
        '7': 'SCM下单';
        '8': '转包下单';
    };
    /** Platform来源组 */
    static readonly SOURCE_PLATFORM_ENUM: {
        OCD: '境岸通';
        SCM_JABIL: 'SCM下单';
        SCM_JABIL_ESR: 'SCM下单';
        SCP: 'SCM下单';
        /** 捷普仓库新增订单来源  优先判断 */
        SCM_DELIVERY: '送货订单';
    };
    /** 从枚举信息中获取订单来源 */
    static getValue(source: string | number, sourcePlatform: string): any;
}
/** 订单 - 进出口 */
export declare const TRADE_TYPE_ENUM: Readonly<{
    '0': '进口';
    '1': '出口';
    '2': '内贸货物跨境运输';
    '3': '国内';
}>;
/** 订单 - 货物类型 */
export declare const GOODS_TYPE_ENUM: Readonly<{
    '1': '普货';
    '2': '危险品';
    '3': '温控货物';
    '4': '设备';
    '5': '易碎货物';
    '6': '鲜活易腐货';
    '7': '空柜';
}>;
/** 订单 - 送货类型 */
export declare const DELIVERY_TYPE_ENUM: Readonly<{
    '1': 'JIT';
    '2': '国内';
    '3': '预做';
}>;
/** 订单 - 原材料类型 */
export declare const MATERIAL_TYPE_ENUM: Readonly<{
    '1': '泡沫';
    '2': '原料';
}>;
/** 订单 - 文件来源 */
export declare const FILE_SOURCE_ENUM: Readonly<{
    '1': '货主';
    default: '平台客服';
}>;
/** 订单 - 应用服务 */
export declare const SEND_RANGE_ENUM: Readonly<{
    '4': '陆运';
    '5': '报关';
    '7': '地勤';
}>;
/** 订单 - 作业状态 - zhy */
export declare const ZHY_SCHEDULED_ITEM_STATUS_ENUM: Readonly<{
    '1': '待指派';
    '2': '进行中';
    '3': '已完成';
    '4': '待验收';
    '99': '已取消';
    '100': '暂停';
}>;
/** 订单 - 车型 */
export declare const CAR_TYPE_ENUM: Readonly<{
    '1': '厢式吨车';
    '2': '货柜车';
    '3': '平板车';
    '4': '栏板式货车';
    '5': '冷冻车';
    '6': '恒温车';
    '7': '飞翼车';
    '11': '小轿车';
    '12': '面包车';
    '13': '仓栅式货车';
    '14': '罐式车';
    '15': '自卸车';
    '16': '短架车';
}>;
/** 订单 - 货运类型 */
export declare const TRAILER_TRANSPORT_TYPE_ENUM: Readonly<{
    '1': '跨境运输';
    '2': '国内运输';
    '3': '港区运输';
    '4': '园区运输';
}>;
/** 订单 - 货运类型 */
export declare const FREIGHT_TRANSPORT_TYPE__ENUM: Readonly<{
    '1': '整柜';
    '2': '散货';
}>;
/** 订单 - 运输信息重量 单位 */
export declare const WEIGHT_UNIT_ENUM: Readonly<{
    千克: '千克';
    吨: '吨';
}>;
/** 订单 - 运输信息件数 单位 */
export declare const GOODS_NUM_UNIT_ENUM: Readonly<{
    件: '件';
    托: '托';
    桶: '桶';
    箱: '箱';
    包: '包';
    其他: '其他';
}>;
/** 订单 - 运输信息体积 单位 */
export declare const VALUME_UNIT_ENUM: Readonly<{
    CBM: 'CBM';
}>;
/**
 * @method 由枚举对象生成选择框Options
 * @param {Object} 枚举对象
 * @return {Array} 表单选择框Options
 */
export declare const enumToSelectOptions: (obj: {}) => {
    key: string;
    value: any;
}[];
/** 订单-单证/附件允许上传格式 */
export declare const UPLOAD_FILE: readonly string[];
