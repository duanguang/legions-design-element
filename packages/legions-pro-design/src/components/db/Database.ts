import { runScriptsSdk } from 'legions-thirdparty-plugin';
export class Database {
  static async initTable(key: string) {
    if (!runScriptsSdk.plugins.dexie) {
      runScriptsSdk.subscribe('dexie', async () => {
        await runScriptsSdk.plugins.dexie.registerInstanceDexie<{}>(
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
      await runScriptsSdk.plugins.dexie.registerInstanceDexie<{}>(
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
