/*
 * @Author: duanguang
 * @Date: 2021-02-20 11:45:28
 * @LastEditTime: 2021-02-22 15:46:33
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/services/userService.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { get, post } from 'legions/request';
import { UserInfoContainerEntity } from '../models/userInfoEntity';
import { HttpConfig, setHeaders, getSystem } from '../constants/httpConfig';
import { SearchEntity } from 'examples/containers/proQuery/searchEntity';
export function getUserInfoService(){
    let url = getSystem()
    let options =setHeaders(`${url}/main/api/v1/account.json`)
    return get(`${HttpConfig.gateWay}`,{},options).then((result)=>{
        return new UserInfoContainerEntity(result)
    })
}
interface ISearchParams{
    keyword?: string|number,
    templateCode?: string,
    size?: string,
    emsNo?: string,
}
/**
 * 海关基础参数获取
 * @param {*} params { templateCode }
 */
export function getCusinfoSearch(params: ISearchParams) {
    let options = setHeaders(`${ getSystem()}/jg/basic/cusinfo/search.json`);
    return post(`${HttpConfig.gateWay}`, { size: 30, ...params }, options).then((res) => {
        return new SearchEntity(res);
    })
}