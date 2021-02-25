import { LegionsProEcharts } from "components";
import { PieSeriesOption } from "echarts/charts";
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

export const mockService = {
    pieData,
}
