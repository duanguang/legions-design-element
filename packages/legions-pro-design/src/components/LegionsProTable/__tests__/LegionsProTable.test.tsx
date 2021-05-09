/*
 * @Author: duanguang
 * @Date: 2021-04-26 16:23:25
 * @LastEditTime: 2021-04-26 16:53:38
 * @LastEditors: duanguang
 * @Description: 
 * @FilePath: /legions-design-element/packages/legions-pro-design/src/components/LegionsProTable/__tests__/LegionsProTable.test.tsx
 * 「扫去窗上的尘埃，才可以看到窗外的美景。」
 */

import React from 'react';
import LegionsProTable from '..';
import { mount,render,shallow,configure } from 'enzyme';
import { JsonProperty } from 'json-mapper-object';

class ResponseVModelNameDataEntity {
    @JsonProperty('key')
    key = void 0;
    @JsonProperty('name')
    name = void 0;
    @JsonProperty('age')
    age = void 0;
    @JsonProperty('address')
    address = void 0;
  }
class ProTableTest extends LegionsProTable.ProTableBaseClass<{},{}>{
    parames:any = {}
    constructor(props) {
        super(props);
        this.pushColumns('key', {
            title: '行号',
            width: '60px',
            sorter: true,
            render: (_, __, index: number) => {
                return this.tableRef.viewModel.pageSize * (this.tableRef.viewModel.pageIndex - 1) + 1 + index;
            },
        })
        this.pushColumns('gname', {
            title: '货物名称',
            width: '100px',
            sorter: true,
            tooltip: true,
        })
        this.pushColumns('typeName', {
            title: '类别',
            width: '100px',
            sorter: true,
        })
    }
    render() {
        return <LegionsProTable<{}, ResponseVModelNameDataEntity>
        onReady={value => {
            this.tableRef = value;
            this.tableRef.viewModel.isAdaptiveHeight = false;

            this.tableRef.viewModel.bodyExternalContainer.set('ButtonAction', {
                height: 48,
            });

            this.tableRef.viewModel.bodyExternalContainer.set('other', {
                height: 70,
            });
        }}
        columns={this.columnsData}
        uniqueKey='id'
        tableModulesName='demo/proTable'
        isOpenCustomColumns={true}
        autoQuery={{
            params: (pageIndex, pageSize) => {
                return { size: pageSize, current: pageIndex, ...this.parames }
            },
            transform: (value) => {
                if (value && !value.isPending && value.value) {
                    const { result = [], current, pageSize, total } = value.value;

                    return {
                        data: result.map((item, index) => {
                            item['key'] = index + 1 + (current - 1) * pageSize;
                            return item;
                        }),
                        total: total,
                    };
                }
                return {
                    total: 0,
                    data: [],
                };
            },
            options: {
                'api-target': `https://qa-scm.hoolinks.com/jg/basic/item-master/list.json`,

            },
            token: (() => {
                return process.env.environment === 'dev' ? 'SESSION=f446c145-9d9c-4fc9-9bc6-f277e4d5a16d' : 'SESSION=61e35aa5-13b4-46c2-9d8b-1cf3cf17864f';
            })(),

            method: 'post',
            ApiUrl: 'https://gateway.hoolinks.com/api/gateway',
            mappingEntity: (that, res) => {
                that.result = res['data'];
                that.total=res['total']
            },
        }}
    >
    </LegionsProTable>
    }
}
describe('表格',() => {
    beforeAll(() => {
        jest.useFakeTimers();
    });
    afterAll(() => {
        jest.useRealTimers();
    });
    it("获取表格示例",() => {
        const componet = mount(<ProTableTest></ProTableTest>)
        console.log(componet);
        expect(componet).not.toBe(null)
    })
})
