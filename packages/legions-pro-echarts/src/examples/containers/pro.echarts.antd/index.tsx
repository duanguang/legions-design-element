import { LegionsProEchartsBox, LegionsProEchartsLayout } from 'components';
import LegionsProEchartsDatePicker from 'components/LegionsProEchartsAntd/date-picker';
import LegionsProEchartsInput from 'components/LegionsProEchartsAntd/input';
import LegionsProEchartsRadio from 'components/LegionsProEchartsAntd/radio';
import LegionsProEchartsSelect from 'components/LegionsProEchartsAntd/select';
import React from 'react';
const { ProRow, ProCol } = LegionsProEchartsLayout;

export default class AntdComponentDemo extends React.Component {
    render() {
        return (
            <LegionsProEchartsLayout gutter={6}>
                <ProRow>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="单选项" height={300} contentStyle={{padding: 10}}>
                            <LegionsProEchartsRadio defaultValue="1">
                                <LegionsProEchartsRadio.Button value="1">总值</LegionsProEchartsRadio.Button>
                                <LegionsProEchartsRadio.Button value="2">进口</LegionsProEchartsRadio.Button>
                                <LegionsProEchartsRadio.Button value="3">出口</LegionsProEchartsRadio.Button>
                            </LegionsProEchartsRadio>
                            <br/><br/>
                            <LegionsProEchartsRadio defaultValue="1" theme='card'>
                                <LegionsProEchartsRadio.Button value="1">本周</LegionsProEchartsRadio.Button>
                                <LegionsProEchartsRadio.Button value="2">本月</LegionsProEchartsRadio.Button>
                                <LegionsProEchartsRadio.Button value="3">本季度</LegionsProEchartsRadio.Button>
                                <LegionsProEchartsRadio.Button value="4">全年</LegionsProEchartsRadio.Button>
                            </LegionsProEchartsRadio>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="表单" height={300} contentStyle={{padding: 10}}>
                            <LegionsProEchartsInput></LegionsProEchartsInput>
                            <br/><br/>
                            <LegionsProEchartsSelect>
                                <LegionsProEchartsSelect.Option value="1">111</LegionsProEchartsSelect.Option>
                                <LegionsProEchartsSelect.Option value="2">222</LegionsProEchartsSelect.Option>
                                <LegionsProEchartsSelect.Option value="3">333</LegionsProEchartsSelect.Option>
                            </LegionsProEchartsSelect>
                            <br/><br/>
                            <LegionsProEchartsDatePicker></LegionsProEchartsDatePicker>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
            </LegionsProEchartsLayout>
        )
    }
}
