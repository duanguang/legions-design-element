import LegionsModels from '../../../components/LegionsModels';
/** 海关基础参数 */
export declare class SearchResponse {
    /**  */
    msg: string;
    /**  */
    ok: boolean;
    /**  */
    status: number;
    /**  */
    data: any[];
    /**  */
    size: number;
    /**  */
    current: number;
    /**  */
    total: number;
}
/** 海关基础参数请求结果 */
export declare class SearchEntity extends LegionsModels.BaseEntity<SearchResponse> {
    constructor(fromJson: any);
}
