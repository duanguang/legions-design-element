import { legionsThirdpartyPlugin } from 'legions-thirdparty-plugin';
export class Database {
  static async initTable(key: string) {
    if (!legionsThirdpartyPlugin.plugins.dexie) {
      legionsThirdpartyPlugin.subscribe('dexie', async () => {
        await legionsThirdpartyPlugin.plugins.dexie.registerInstanceDexie<{}>(
          'formUiStore',
          key,
          [
            {
              selectData:
                '++id,[modulesKeys+pageIndex+keywords],modulesKeys,keywords,pageIndex,value,total',
            },
          ]
        );
      });
    } else {
      await legionsThirdpartyPlugin.plugins.dexie.registerInstanceDexie<{}>(
        'formUiStore',
        key,
        [
          {
            selectData:
              '++id,[modulesKeys+pageIndex+keywords],modulesKeys,keywords,pageIndex,value,total',
          },
        ]
      );
    }
  }
}
