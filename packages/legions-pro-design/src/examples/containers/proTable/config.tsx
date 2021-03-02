/*
 * @Author: duanguang
 * @Date: 2021-01-12 15:50:48
 * @LastEditTime: 2021-02-25 18:38:23
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/examples/containers/proTable/config.tsx
 * @「扫去窗上的尘埃，才可以看到窗外的美景。」
 */
import { Button,Row } from 'antd';
import React from 'react';
import { ProTable } from '.';
import { TableColumnConfig } from '../../../../es/interface/antd';
export abstract class PageListConfig<P, S = {}> extends React.Component<P, S> {
    instanceStatement: ProTable = null;
    constructor(props: P) {
     super(props);
    }
    registeredInstanceStatement(instance: ProTable) {
       this.instanceStatement = instance;
    }
    protected createTableColumnsConfig() {
      const columnsConfig: TableColumnConfig<{}>[] = [{
        title: '企业',
        dataIndex: 'qiye',
        key: 'qiye',
        width: '100px',
        sorter: false,
      }];

      return columnsConfig;
    }
}