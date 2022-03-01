/*
 * @Author: duanguang
 * @Date: 2021-01-07 17:02:30
 * @LastEditTime: 2022-03-01 14:28:53
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProLayout/store/TabPaneViewData.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { action, observable } from 'legions/store';
export class TabPaneViewData {
  /**
   * 页签生成时间戳信息
   *
   */
  @observable tabPanesTimestamp = observable.map<string>();

  /**
   *
   * 更新相关页签时间戳信息
   */
  @action updateTimestamp(panesKey: string,timeStamp?: number) {
    //@ts-ignore
    if (this.tabPanesTimestamp.has(panesKey)) {
      this.tabPanesTimestamp.set(
         //@ts-ignore
        panesKey,
        timeStamp || Date.parse(new Date().toString())
      );
    } else {
      this.tabPanesTimestamp.set(
         //@ts-ignore
        panesKey,
        timeStamp || Date.parse(new Date().toString())
      );
    }
  }
}
