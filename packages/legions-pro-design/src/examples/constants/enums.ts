/*
 * @Author: ChenQiang
 * @Date: 2019-07-23 09:40:45
 * @Last Modified by: ChenQiang
 * @Last Modified time: 2019-07-29 14:55:13
 */
/* 枚举常量 - 常量 */
/** 订单 - 订单状态 */
export const ORDER_STATUS_ENUM = Object.freeze(new class {
    '0': '待报价' = '待报价'
    '4': '待报价' = '待报价'
    '1': '待接单' = '待接单'
    '5': '待确认' = '待确认'
    '6': '进行中' = '进行中'
    '7': '待验收' = '待验收'
    '8': '已完成' = '已完成'
    '9': '已终止' = '已终止'
});

/** 订单 - 订单来源类 */
export class OrderSourceEnum {
    /** 基础来源组 */
    static readonly SOURCE_ENUM = new class {
        '1': '货主下单' = '货主下单';
        '2': '代客户下单' = '代客户下单';
        '3': '运价下单' = '运价下单';
        '4': '货盘下单' = '货盘下单';
        '5': '套餐下单' = '套餐下单';
        '6': '境岸通' = '境岸通';
        '7': 'SCM下单' = 'SCM下单';
        '8': '转包下单' = '转包下单';
    }
    /** Platform来源组 */
    static readonly SOURCE_PLATFORM_ENUM = new class {
        OCD: '境岸通' = '境岸通';
        SCM_JABIL: 'SCM下单' = 'SCM下单';
        SCM_JABIL_ESR: 'SCM下单' = 'SCM下单';
        SCP: 'SCM下单' = 'SCM下单';
        /** 捷普仓库新增订单来源  优先判断 */
        SCM_DELIVERY: '送货订单' = '送货订单';
    }
    /** 从枚举信息中获取订单来源 */
    static getValue(source:string | number, sourcePlatform:string) {
        const mySource = source ? source.toString() : '';
        const mySourcePlatform = OrderSourceEnum.SOURCE_PLATFORM_ENUM[sourcePlatform];
        if (sourcePlatform !== 'SCM_DELIVERY' && mySource === '8' || !mySourcePlatform) {
            return OrderSourceEnum.SOURCE_ENUM[mySource]
        }
        return mySourcePlatform;
    }
}

/** 订单 - 进出口 */
export const TRADE_TYPE_ENUM = Object.freeze(new class {
    '0': '进口' = '进口';
    '1': '出口' = '出口';
    '2': '内贸货物跨境运输' = '内贸货物跨境运输';
    '3': '国内' = '国内';
});

/** 订单 - 货物类型 */
export const GOODS_TYPE_ENUM = Object.freeze(new class {
    '1': '普货' = '普货';
    '2': '危险品' = '危险品';
    '3': '温控货物' = '温控货物';
    '4': '设备' = '设备';
    '5': '易碎货物' = '易碎货物';
    '6': '鲜活易腐货' = '鲜活易腐货';
    '7': '空柜' = '空柜';
});

/** 订单 - 送货类型 */
export const DELIVERY_TYPE_ENUM = Object.freeze(new class {
    '1': 'JIT' = 'JIT';
    '2': '国内' = '国内';
    '3': '预做' = '预做';
});

/** 订单 - 原材料类型 */
export const MATERIAL_TYPE_ENUM = Object.freeze(new class {
    '1': '泡沫' = '泡沫';
    '2': '原料' = '原料';
});

/** 订单 - 文件来源 */
export const FILE_SOURCE_ENUM = Object.freeze(new class {
    '1': '货主' = '货主';
    'default': '平台客服' = '平台客服';
});

/** 订单 - 应用服务 */
export const SEND_RANGE_ENUM = Object.freeze(new class {
    '4': '陆运' = '陆运';
    '5': '报关' = '报关';
    '7': '地勤' = '地勤';
});

/** 订单 - 作业状态 - zhy */
export const ZHY_SCHEDULED_ITEM_STATUS_ENUM = Object.freeze(new class {
    '1': '待指派' = '待指派';
    '2': '进行中' = '进行中';
    '3': '已完成' = '已完成';
    '4': '待验收' = '待验收';
    '99': '已取消' = '已取消';
    '100': '暂停' = '暂停';
});

/** 订单 - 车型 */
export const CAR_TYPE_ENUM = Object.freeze(new class {
    '1': '厢式吨车' = '厢式吨车';
    '2': '货柜车' = '货柜车';
    '3': '平板车' = '平板车';
    '4': '栏板式货车' = '栏板式货车';
    '5': '冷冻车' = '冷冻车';
    '6': '恒温车' = '恒温车';
    '7': '飞翼车' = '飞翼车';
    '11': '小轿车' = '小轿车';
    '12': '面包车' = '面包车';
    '13': '仓栅式货车' = '仓栅式货车';
    '14': '罐式车' = '罐式车';
    '15': '自卸车' = '自卸车';
    '16': '短架车' = '短架车';
});

/** 订单 - 货运类型 */
export const TRAILER_TRANSPORT_TYPE_ENUM = Object.freeze(new class {
    '1': '跨境运输' = '跨境运输';
    '2': '国内运输' = '国内运输';
    '3': '港区运输' = '港区运输';
    '4': '园区运输' = '园区运输';
});

/** 订单 - 货运类型 */
export const FREIGHT_TRANSPORT_TYPE__ENUM = Object.freeze(new class {
    '1': '整柜' = '整柜';
    '2': '散货' = '散货';
});

/** 订单 - 运输信息重量 单位 */
export const WEIGHT_UNIT_ENUM = Object.freeze(new class {
    '千克': '千克' = '千克';
    '吨': '吨' = '吨';
});

/** 订单 - 运输信息件数 单位 */
export const GOODS_NUM_UNIT_ENUM = Object.freeze(new class {
    '件': '件' = '件';
    '托': '托' = '托';
    '桶': '桶' = '桶';
    '箱': '箱' = '箱';
    '包': '包' = '包';
    '其他': '其他' = '其他';
});
/** 订单 - 运输信息体积 单位 */
export const VALUME_UNIT_ENUM = Object.freeze(new class {
    'CBM': 'CBM' = 'CBM';
});


/**
 * @method 由枚举对象生成选择框Options
 * @param {Object} 枚举对象
 * @return {Array} 表单选择框Options
 */
export const enumToSelectOptions = (obj:{}) => {
    return Object.keys(obj).map((key:string) => ({
        key,
        value: obj[key],
    }))
}

/** 订单-单证/附件允许上传格式 */
export const UPLOAD_FILE:readonly string[] = [
    'pdf', 'png', 'jpg', 'jpeg', 'bmp', 'gif',
    'xls', 'xlsx',
    'docx', 'doc',
    'tif', 'rtf',
    'rar', 'zip',
]
