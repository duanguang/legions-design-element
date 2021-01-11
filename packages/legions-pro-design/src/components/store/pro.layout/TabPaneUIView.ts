/*
 * @Author: duanguang
 * @Date: 2021-01-07 17:02:30
 * @LastEditTime: 2021-01-07 17:56:04
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/store/pro.layout/TabPaneUIView.ts
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { action, observable } from 'legions/store';
export class TabPaneUIView {
  /**
   * 页签生成时间戳信息
   *
   * @memberof TabPaneUIView
   */
  @observable tabPanesTimestamp = observable.map<number>();

  /**
   *
   * 更新相关页签时间戳信息
   * @memberof TabPaneUIView
   */
  @action updateTimestamp(panesKey: string, timeStamp?: number) {
    if (this.tabPanesTimestamp.has(panesKey)) {
      this.tabPanesTimestamp.set(
        panesKey,
        timeStamp || Date.parse(new Date().toString())
      );
    } else {
      this.tabPanesTimestamp.set(
        panesKey,
        timeStamp || Date.parse(new Date().toString())
      );
    }
  }
}
