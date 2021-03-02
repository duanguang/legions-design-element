import { LegionsProEchartsBox, LegionsProEchartsLayout, LegionsProEchartsProgress } from 'components';
import LegionsProEchartsDatePicker from 'components/LegionsProEchartsParts/date-picker';
import LegionsProEchartsInput from 'components/LegionsProEchartsParts/input';
import LegionsProEchartsRadio from 'components/LegionsProEchartsParts/radio';
import LegionsProEchartsSelect from 'components/LegionsProEchartsParts/select';
import React from 'react';
import moment from 'moment';
import LegionsProEchartsButton from 'components/LegionsProEchartsParts/button';
const { ProRow, ProCol } = LegionsProEchartsLayout;

export default class PartsDemo extends React.Component {
    render() {
        return (
            <LegionsProEchartsLayout gutter={6}>
                <ProRow>
                    <ProCol span={8}>
                        <LegionsProEchartsBox title="按钮" height={300} contentStyle={{padding: 10}}>
                            <LegionsProEchartsButton type="primary" style={{margin: 2}}>primary</LegionsProEchartsButton>
                            <LegionsProEchartsButton style={{margin: 2}}>default</LegionsProEchartsButton>
                            <LegionsProEchartsButton type="dashed" style={{margin: 2}}>dashed</LegionsProEchartsButton>
                            <LegionsProEchartsButton type="danger" style={{margin: 2}}>danger</LegionsProEchartsButton>
                            <br/><br/>
                            <LegionsProEchartsButton icon="download" type="primary" style={{margin: 2}}>primary</LegionsProEchartsButton>
                            <LegionsProEchartsButton icon="download" style={{margin: 2}}>default</LegionsProEchartsButton>
                            <LegionsProEchartsButton icon="download" type="dashed" style={{margin: 2}}>dashed</LegionsProEchartsButton>
                            <LegionsProEchartsButton icon="download" type="danger" style={{margin: 2}}>danger</LegionsProEchartsButton>
                            <br/><br/>
                            <LegionsProEchartsButton disabled type="primary" style={{margin: 2}}>primary(dis)</LegionsProEchartsButton>
                            <LegionsProEchartsButton disabled style={{margin: 2}}>default(dis)</LegionsProEchartsButton>
                            <LegionsProEchartsButton disabled type="dashed" style={{margin: 2}}>dashed(dis)</LegionsProEchartsButton>
                            <LegionsProEchartsButton disabled type="danger" style={{margin: 2}}>danger(dis)</LegionsProEchartsButton>
                            <br/><br/>
                            <LegionsProEchartsButton loading type="primary" style={{margin: 2}}>primary</LegionsProEchartsButton>
                            <LegionsProEchartsButton loading style={{margin: 2}}>default</LegionsProEchartsButton>
                            <LegionsProEchartsButton loading type="dashed" style={{margin: 2}}>dashed</LegionsProEchartsButton>
                            <LegionsProEchartsButton loading type="danger" style={{margin: 2}}>danger</LegionsProEchartsButton>
                            <br/><br/>
                            <LegionsProEchartsButton.Group>
                                <LegionsProEchartsButton type="primary">primary</LegionsProEchartsButton>
                                <LegionsProEchartsButton>default</LegionsProEchartsButton>
                                <LegionsProEchartsButton type="dashed">dashed</LegionsProEchartsButton>
                                <LegionsProEchartsButton type="danger">danger</LegionsProEchartsButton>
                            </LegionsProEchartsButton.Group>
                        </LegionsProEchartsBox>
                    </ProCol>
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
                    <ProCol span={5}>
                        <LegionsProEchartsBox title="输入框" height={300} contentStyle={{padding: 10}}>
                            <LegionsProEchartsInput></LegionsProEchartsInput>
                            <br/><br/>
                            <LegionsProEchartsInput defaultValue="内容"></LegionsProEchartsInput>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={5}>
                        <LegionsProEchartsBox title="下拉框" height={300} contentStyle={{padding: 10}}>
                            <LegionsProEchartsSelect>
                                <LegionsProEchartsSelect.Option value="1">111</LegionsProEchartsSelect.Option>
                                <LegionsProEchartsSelect.Option value="2">222</LegionsProEchartsSelect.Option>
                                <LegionsProEchartsSelect.Option value="3">333</LegionsProEchartsSelect.Option>
                            </LegionsProEchartsSelect>
                            <br/><br/>
                            <LegionsProEchartsSelect defaultValue="1">
                                <LegionsProEchartsSelect.Option value="1">111</LegionsProEchartsSelect.Option>
                                <LegionsProEchartsSelect.Option value="2">222</LegionsProEchartsSelect.Option>
                                <LegionsProEchartsSelect.Option value="3">333</LegionsProEchartsSelect.Option>
                            </LegionsProEchartsSelect>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
                <ProRow>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="日期选择" height={300} contentStyle={{padding: 10}}>
                            <LegionsProEchartsDatePicker></LegionsProEchartsDatePicker>
                            <br/><br/>
                            <LegionsProEchartsDatePicker defaultValue={moment()}></LegionsProEchartsDatePicker>
                            <br/><br/>
                            <LegionsProEchartsDatePicker.RangePicker defaultValue={[moment(),moment()]}></LegionsProEchartsDatePicker.RangePicker>
                            <br/><br/>
                            <LegionsProEchartsDatePicker.MonthPicker defaultValue={moment()}></LegionsProEchartsDatePicker.MonthPicker>
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={18}>
                        <LegionsProEchartsBox title="进度条" height={300} contentStyle={{padding: 10}}>
                            <LegionsProEchartsProgress percent={0}></LegionsProEchartsProgress>
                            <LegionsProEchartsProgress percent={50}></LegionsProEchartsProgress>
                            <LegionsProEchartsProgress percent={100}></LegionsProEchartsProgress>
                            <br/><br/>
                            <LegionsProEchartsProgress type="circle" percent={0}></LegionsProEchartsProgress>
                            <LegionsProEchartsProgress type="circle" percent={50}></LegionsProEchartsProgress>
                            <LegionsProEchartsProgress type="circle" percent={100}></LegionsProEchartsProgress>
                            <LegionsProEchartsProgress type="dashboard" percent={0}></LegionsProEchartsProgress>
                            <LegionsProEchartsProgress type="dashboard" percent={50}></LegionsProEchartsProgress>
                            <LegionsProEchartsProgress type="dashboard" percent={100}></LegionsProEchartsProgress>
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
            </LegionsProEchartsLayout>
        )
    }
}
