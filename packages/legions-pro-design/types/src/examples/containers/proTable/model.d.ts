export declare class ResponseVModelNameDataEntity {
    key: any;
    name: any;
    age: any;
    address: any;
}
export declare class MaterialsInfosDataEntity {
    id: any;
    companyUid: any;
    createrId: any;
    updaterId: any;
    createrName: string;
    updaterName: string;
    createTime: string;
    updateTime: string;
    groupName: string;
    groupUid: any;
    version: string;
    companyCode: any;
    typeName: string;
    gname: string;
    gmodel: string;
    unit: string;
    unitName: string;
    commodityCode: string;
    declareElement: string;
    declareDesc: string;
    price: string;
    curr: string;
    netWt: string;
    grossWt: string;
    unitWeight: string;
    note: string;
    orgCountry: string;
    itemSeqNo: string;
    baseCommodityItemNo: string;
    itemAttr: string;
    state: string;
    stateDesc: {
        '1': string;
        '2': string;
    };
    gdescEn: string;
    goodsCode: string;
    goodsName: string;
    goodsSpec: string;
    declareName: string;
    globalUnitName: string;
    secondaryUnitName: string;
    rate1: string;
    unitGlobalRate: string;
    unitSecondaryRate: string;
    declareGlobalRate: string;
    declareSecondaryRate: string;
    get itemNo(): string;
}
export declare class MaterialsInfosEntity {
    data: any[];
    size: number;
    current: number;
    total: number;
}
