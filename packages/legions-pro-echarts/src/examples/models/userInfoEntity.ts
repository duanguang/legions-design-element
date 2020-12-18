import {JsonProperty} from 'json-mapper-object';
import {BaseEntity} from './common/baseEntity';

class RolesEntity{
    @JsonProperty('id')
    id = -1

    @JsonProperty('name')
    name = ''

    @JsonProperty('description')
    description = ''

    @JsonProperty('validated')
    validated = false

    @JsonProperty('companyCode')
    companyCode = ''
}
class UserInfoEntity{
    @JsonProperty('id')
    id = -1;

    @JsonProperty('loginId')
    loginId = ''

    @JsonProperty('validated')
    validated = false

    @JsonProperty('lastRole')
    lastRole = -1

    @JsonProperty('companyId')
    companyId = -1

    @JsonProperty('companyInfo')
    companyInfo = void 0

    @JsonProperty({clazz:RolesEntity,name:'roles'})
    roles = new RolesEntity()

    @JsonProperty('userName')
    userName = ''

    @JsonProperty('qpHelperLoginId')
    qpHelperLoginId = ''

    @JsonProperty('companyCode')
    companyCode = ''

    @JsonProperty('companyName')
    companyName = ''

    @JsonProperty('uId')
    uId = ''

    @JsonProperty('citUserId')
    citUserId= ''

    @JsonProperty('companyUid')
    companyUid= ''

    @JsonProperty('lastRoleName')
    lastRoleName = ''
}
interface IUerInfoEntity{
    msg:string,
    ok:boolean,
    status:string,
    data:UserInfoEntity
}
export class UserInfoContainerEntity extends BaseEntity<UserInfoEntity>{
    constructor(fromJson:IUerInfoEntity){
       // @ts-ignore
        super(fromJson);
        this.message=fromJson.msg||'查询成功';
        this.success=fromJson.ok||true;
        this.code=fromJson.status||'';
        let data = fromJson.data
        if(fromJson&&data){
            this.result=super.transformRow(data,UserInfoEntity)
        }
        else{
            this.result = new UserInfoEntity()
        }
    }
}
