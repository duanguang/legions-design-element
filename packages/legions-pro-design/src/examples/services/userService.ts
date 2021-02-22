import { get, post } from 'legions/request';
import { UserInfoContainerEntity } from '../models/userInfoEntity';
import { HttpConfig, setHeaders, getSystem } from '../constants/httpConfig';
export function getUserInfoService(){
    let url = getSystem()
    let options =setHeaders(`${url}/main/api/v1/account.json`)
    return get(`${HttpConfig.gateWay}`,{},options).then((result)=>{
        return new UserInfoContainerEntity(result)
    })
}
