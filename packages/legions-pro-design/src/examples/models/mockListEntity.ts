import {JsonProperty} from 'json-mapper-object';
import { PageEntity, IPageEntity } from './common/pageEntity';
class MockEntity{
    @JsonProperty('id')
    id = void 0

    @JsonProperty('companyId')
    companyId = void 0

    @JsonProperty('loginId')
    loginId = void 0

    @JsonProperty('name')
    name = void 0
}

interface IMockEntity{
    msg:string,
    ok:boolean,
    status:string,
    data:IPageEntity<MockEntity>
}
export class MockPageListEntity extends PageEntity<MockEntity>{
    constructor(fromJson:IMockEntity){
        super(fromJson,MockEntity);
        this.message=fromJson.msg||'查询成功';
        this.success=fromJson.ok||true;
        this.code=fromJson.status||'';
    }
}
