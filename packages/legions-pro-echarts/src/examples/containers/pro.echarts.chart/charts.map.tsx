import React from 'react';
import { LegionsProEchartsBox, LegionsProEchartsMap } from 'components';

export class MapSimpleDemo extends React.Component{
    render() {
        return (
            <LegionsProEchartsBox title="基础地图" height="500px">
                <LegionsProEchartsMap></LegionsProEchartsMap>
            </LegionsProEchartsBox>
        )
    }
}
export class MapDemo extends React.Component{
    render() {
        return (
            <LegionsProEchartsBox title="动态地图" height="500px">
                <LegionsProEchartsMap option={{
                    series: [
                        {map: 'world'},
                        {
                            data: [
                                {value: [113.956366,23.610079], itemStyle:{ color:'#4ab2e5' }},
                                {value: [-88.997526,39.750929], itemStyle:{ color:'#4fb6d2' }},
                                {value: [-50.289613,-15.639279], itemStyle:{ color:'#52b9c7' }},
                                {value: [159.3241,54.289787], itemStyle:{ color:'#5abead' }},
                                {value: [-50.2947,75.250012], itemStyle:{ color:'#f34e2b' }},
                                {value: [-0.95315,47.010593], itemStyle:{ color:'#f56321' }},
                                {value: [-15.523809,18.605398], itemStyle:{ color:'#f56f1c' }},
                                {value: [-103.978012,26.789941], itemStyle:{ color:'#f58414' }},
                                {value: [-111.336931,66.675589], itemStyle:{ color:'#f58f0e' }},
                                {value: [97.069343,3.680498], itemStyle:{ color:'#f5a305' }},
                                {value: [128.271159,-21.013708], itemStyle:{ color:'#e7ab0b' }},
                                {value: [23.627334,-32.23116], itemStyle:{ color:'#dfae10' }},
                                {value: [-67.770436,-36.143741], itemStyle:{ color:'#d5b314' }},
                                {value: [-15.81647,64.862193], itemStyle:{ color:'#c1bb1f' }},
                                {value: [108.841918,63.776698], itemStyle:{ color:'#b9be23' }},
                                {value: [-157.846993,62.100916], itemStyle:{ color:'#a6c62c' }},
                            ]
                        },
                        {
                            data: [
                                {coords: [[-88.997526,39.750929], [113.956366,23.610079]], lineStyle:{color:'#4ab2e5'}},
                                {coords: [[-88.997526,39.750929], [113.956366,23.610079]], lineStyle:{color:'#4fb6d2'}},
                                {coords: [[-50.289613,-15.639279], [113.956366,23.610079]], lineStyle:{color:'#52b9c7'}},
                                {coords: [[159.3241,54.289787], [113.956366,23.610079]], lineStyle:{color:'#5abead'}},
                                {coords: [[-50.2947,75.250012], [113.956366,23.610079]], lineStyle:{color:'#f34e2b'}},
                                {coords: [[-0.95315,47.010593], [113.956366,23.610079]], lineStyle:{color:'#f56321'}},
                                {coords: [[-15.523809,18.605398], [113.956366,23.610079]], lineStyle:{color:'#f56f1c'}},
                                {coords: [[-103.978012,26.789941], [113.956366,23.610079]], lineStyle:{color:'#f58414'}},
                                {coords: [[-111.336931,66.675589], [113.956366,23.610079]], lineStyle:{color:'#f58f0e'}},
                                {coords: [[97.069343,3.680498], [113.956366,23.610079]], lineStyle:{color:'#f5a305'}},
                                {coords: [[128.271159,-21.013708], [113.956366,23.610079]], lineStyle:{color:'#e7ab0b'}},
                                {coords: [[23.627334,-32.23116], [113.956366,23.610079]], lineStyle:{color:'#dfae10'}},
                                {coords: [[-67.770436,-36.143741], [113.956366,23.610079]], lineStyle:{color:'#d5b314'}},
                                {coords: [[-15.81647,64.862193], [113.956366,23.610079]], lineStyle:{color:'#c1bb1f'}},
                                {coords: [[108.841918,63.776698], [113.956366,23.610079]], lineStyle:{color:'#b9be23'}},
                                {coords: [[-157.846993,62.100916], [113.956366,23.610079]], lineStyle:{color:'#a6c62c'}},
                            ]
                        }
                    ]
                }}></LegionsProEchartsMap>
            </LegionsProEchartsBox>
        )
    }
}
