/*
 * @Author: duanguang
 * @Date: 2021-03-02 14:19:18
 * @LastEditTime: 2021-03-03 15:15:52
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/proQuery/searchEntity.ts
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { JsonProperty } from 'json-mapper-object';
import LegionsModels from '../../../components/LegionsModels';

/** 海关基础参数 */
export class SearchResponse {
    /**  */
    @JsonProperty('msg')
    msg = ''

    /**  */
    @JsonProperty('ok')
    ok = false

    /**  */
    @JsonProperty('status')
    status = 0

    /**  */
    @JsonProperty('data')
    data = []

    /**  */
    @JsonProperty('size')
    size = 0

    /**  */
    @JsonProperty('current')
    current = 0

    /**  */
    @JsonProperty('total')
    total = 0
}

/** 海关基础参数请求结果 */
export class SearchEntity extends LegionsModels.BaseEntity<SearchResponse>{
    // tslint:disable-next-line: typedef
    constructor(fromJson) {
        super();
        this.message = fromJson.msg || '查询成功';
        this.success = fromJson.ok ? true : false;
        this.code = fromJson.code || '';
        if (fromJson) {
            this.result = super.transformRow(fromJson, SearchResponse);
        } else {
            this.result = new SearchResponse();
        }
    }
}
