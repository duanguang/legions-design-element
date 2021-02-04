import { JsonProperty } from 'json-mapper-object';
import { BaseEntity } from '../../../components/models';

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
export class SearchEntity extends BaseEntity<SearchResponse>{
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
