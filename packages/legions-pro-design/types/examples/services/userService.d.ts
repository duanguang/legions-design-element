import { UserInfoContainerEntity } from '../models/userInfoEntity';
import { SearchEntity } from 'examples/containers/proQuery/searchEntity';
export declare function getUserInfoService(): Promise<UserInfoContainerEntity>;
interface ISearchParams {
    keyword?: string | number;
    templateCode?: string;
    size?: string;
    emsNo?: string;
}
/**
 * 海关基础参数获取
 * @param {*} params { templateCode }
 */
export declare function getCusinfoSearch(params: ISearchParams): Promise<SearchEntity>;
export {};
