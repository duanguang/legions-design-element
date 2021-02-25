import { LegionsProEcharts } from "components";
import { LineSeriesOption, PieSeriesOption } from "echarts/charts";
import { LegionsProEchartsOption } from 'components/interface';

const sleep = (time: number) => new Promise<void>((resolve) => {
    setTimeout(() => {
        resolve()
    }, time * 1000);
})

/** 饼图数据模拟 */
export const pieData = async (a: number): Promise<LegionsProEchartsOption<PieSeriesOption>> => {
    await sleep(1)
    return {
        series: {
            data: [
                { value: 1048, name: '搜索引擎' },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' },
                { value: 484, name: '联盟广告' },
            ]
        }
    }
}
/** 折线图数据模拟 */
export const lineData = async (): Promise<LegionsProEchartsOption<LineSeriesOption>> => {
    await sleep(1)
    return {
        xAxis: {
            data: ['202001', '202002', '202003', '202004', '202005', '202006', '202007', '202008', '202009', '202010'],
        },
        series: [
            {
                name: '出口',
                type: 'line',
                stack: '总量',
                symbolSize: 5,
                data: [10.32, 12.43, 26.45, 20.09, 34.42, 11.43, 13.58, 25.47, 38.45, 31.58],
            },
            {
                name: '进口',
                type: 'line',
                stack: '总量',
                symbolSize: 5,
                data: [11.43, 13.58, 25.47, 38.45, 31.58, 26.45, 20.09, 34.42, 11.43, 42.56],
            },
        ],
    }
}

export const mockService = {
    pieData,
    lineData,
}
