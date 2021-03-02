import { LegionsProEcharts } from "components";
import { BarSeriesOption, LineSeriesOption, PieSeriesOption } from "echarts/charts";
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

/** 柱状图数据模拟 */
export const barData = async (): Promise<LegionsProEchartsOption<BarSeriesOption>> => {
    await sleep(1)
    return {
        dataset: {
            dimensions: ['product', '2015', '2016', '2017'],
            source: [
                { product: 'Matcha', '2015': 43.3, '2016': 85.8, '2017': 93.7 },
                { product: 'Milk', '2015': 83.1, '2016': 73.4, '2017': 55.1 },
                { product: 'Cheese', '2015': 86.4, '2016': 65.2, '2017': 82.5 },
                { product: 'Walnut', '2015': 72.4, '2016': 53.9, '2017': 39.1 },
            ],
        },
        series: [
            {
                type: 'bar',
                barWidth: '10%',
                barGap: '0',
                barCategoryGap: '15px',
            },
            {
                type: 'bar',
                barWidth: '10%',
                barGap: '15%',
            },
            {
                type: 'bar',
                barWidth: '10%',
                barGap: '25%',
                barCategoryGap: '5%'
            },
        ],
    };
}


export const mockService = {
    pieData,
    lineData,
    barData,
}
