import { LegionsProEchartsBox, LegionsProEchartsLayout,LegionsProEchartsProgress } from "components";
import React from "react";
const { ProRow, ProCol } = LegionsProEchartsLayout;
export class ProProgressDemo extends React.Component{
    render(){
        return(
            <LegionsProEchartsLayout gutter={6}>
                <ProRow>
                    <ProCol span={6}>
                        <LegionsProEchartsBox title="标准进度条" height="300px">
                            <LegionsProEchartsProgress percent={30}/>
                            <LegionsProEchartsProgress percent={50} status="active" />
                            <LegionsProEchartsProgress percent={70} status="exception" />
                            <LegionsProEchartsProgress percent={100} showInfo={false} />
                            <LegionsProEchartsProgress percent={50} showInfo={false} />
                        </LegionsProEchartsBox>
                    </ProCol>
                    <ProCol span={12}>
                        <LegionsProEchartsBox title="圈形进度条" height="300px">
                            <LegionsProEchartsProgress type="circle" percent={75} />
                            <LegionsProEchartsProgress type="circle" percent={70} status="exception" />
                            <LegionsProEchartsProgress type="circle" percent={100} />
                            <LegionsProEchartsProgress type="circle" percent={70} width={80} />
                            <LegionsProEchartsProgress type="circle" percent={70} width={80} showInfo={false} />
                        </LegionsProEchartsBox>
                    </ProCol>
                </ProRow>
            </LegionsProEchartsLayout>
        )
    }
}
