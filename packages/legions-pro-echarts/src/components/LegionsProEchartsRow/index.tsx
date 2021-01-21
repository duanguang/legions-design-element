import React from 'react';
import { Row } from 'antd';
import {RowProps} from 'antd/lib/grid/row'
interface ILegionsProEchartsRowProps extends RowProps{

}
const LegionsProEchartsRow = (props:ILegionsProEchartsRowProps) => {
    return <Row {...props}></Row>
}
export default LegionsProEchartsRow
