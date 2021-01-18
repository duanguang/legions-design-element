import {JsonProperty} from 'json-mapper-object';
import {BaseEntity} from './common/baseEntity';
class UserEntity{


    /**
     * 姓名
     *
     * @memberof UserEntity
     */
    @JsonProperty('name')
    name = void 0;


    /**
     * 年龄
     *
     * @memberof UserEntity
     */
    @JsonProperty('age')
    age = void 0;
}
export class MockEntity{
    @JsonProperty('id')
    id = void 0

    @JsonProperty('companyId')
    companyId = void 0

    @JsonProperty('loginId')
    loginId:number = -1

    /**
     * 用户信息
     *
     * @memberof MockEntity
     */
    @JsonProperty({clazz:UserEntity,name:'user'})
    user = new UserEntity()
}

interface IMockEntity{
    msg:string,
    ok:boolean,
    status:string,
    data:MockEntity
}
export class MockContainerEntity extends BaseEntity<MockEntity>{
    constructor(fromJson:IMockEntity){
       // @ts-ignore
        super(fromJson);
        this.message=fromJson.msg||'查询成功';
        this.success=fromJson.ok||true;
        this.code=fromJson.status||'';
        let data = fromJson.data
        if(fromJson&&data){
            this.result=super.transformRow(data,MockEntity)
        }
    }
}
