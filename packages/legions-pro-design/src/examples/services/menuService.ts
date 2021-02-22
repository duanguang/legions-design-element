import { get, post } from 'legions/request';
import { HttpConfig, setHeaders, getSystem } from '../constants/httpConfig';
import { ContainerEntity } from '../models/common/baseEntity';
import { message } from 'antd';
import { JsonProperty } from 'json-mapper-object';
import { MenuContainerEntity } from 'components/models';
/**
 *
 * 获取菜单信息
 * @export
 * @returns
 */
export function getMenuList() {
  let url = getSystem()
  /* const v = new Date().getTime() */
  let options =setHeaders(`${url}/main/api/v1/menus.json`)
  return get(`${HttpConfig.gateWay}`,{},options).then((result) => {
    return new MenuContainerEntity(result);
    },
  )
}

/**
 * 删除异步任务
 * @param id 任务id
 */
export function exportTaskDeleteService(ids: string) {
  let url = getSystem();
  let options = setHeaders(`${url}/jg/report/export-task/delete.json`);
  return post(`${HttpConfig.gateWay}`, { ids }, options)
    .then(result => {
        return new ContainerEntity<object>(result);
    })
    .catch((error: string) => {
        message.error('系统异常，请联系管理员！');
    });
}