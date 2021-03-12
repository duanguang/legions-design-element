import { LegionsProEchartsBox, LegionsProEchartsWordCloud } from 'components';
import React from 'react';

let data = [
    '一般贸易','金关二期','物流协同','货代端','司机端','在线报关','口岸协同','货代','报关行',
    '通关作业','地勤作业','家居（家具）产业','机械汽配产业','面板电子产业','快消品行业','预归类','培训',
    'AEO','关税筹划','海关稽查辅导','链英汇','一般贸易企业','加工贸易企业','综合企业',
]
export default class WordCloudDemo extends React.Component {
    render() {
        return (
            <LegionsProEchartsBox title="词云" height="350px">
                <LegionsProEchartsWordCloud data={Array.from({length: 150}).map((item, index) => ({
                    name: data[index % data.length],
                    value: Math.random() * (index > 50 ? 10 : 1000)
                }))}></LegionsProEchartsWordCloud>
            </LegionsProEchartsBox>
        )
    }
}
