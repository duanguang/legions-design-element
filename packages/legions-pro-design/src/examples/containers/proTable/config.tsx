import { Button,Row } from 'antd';
import React from 'react';
import { ProTable } from '.';
import { TableColumnConfig } from '../../../../es/interface/antd';
import { IQuery } from '../../../../es/LegionsProQueryConditions/interface';
export abstract class PageListConfig<P, S = {}> extends React.Component<P, S> {
    instanceStatement: ProTable = null;
    constructor(props: P) {
     super(props);
    }
    registeredInstanceStatement(instance: ProTable) {
       this.instanceStatement = instance;
    }
    protected createQueryConfig() {
      const that: ProTable = this.instanceStatement;

      const queryConfig: Array<IQuery> = [{
        container: {
          width: 200,
          position: 'content',

          component: {
            label: '文本框:',

            props: {
              width: 140,
              placeholder: '请输入',
              maxLength: '50',
            },

            type: 'text',

            JsonProperty: {
              name: 'name',
              value: '',
              queryPrams: 'name',
            },

            defaultValue: '',
            hooks: [],
          },
        },
      }, {
        container: {
          position: 'right',

          component: {
            props: {
              width: 86,
            },

            hooks: [{
              name: 'onSearch',

              handle: function handle(value) {
                // @ts-ignore
                that.handleSearch(value);
              },
            }, {
              name: 'onReset',

              handle: function handle(value) {
                // @ts-ignore
                that.handleReset(value);
              },
            }],
          },
        },
      }];

      return queryConfig;
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