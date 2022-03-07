import React from 'react';
import { ProConditions } from 'components/LegionsProConditions/interface';
import { ObservableMap } from 'mobx';
interface Istate {
    visable: boolean;
}
export default class QueryDemo extends React.Component<{}, Istate> {
    queryRef: ProConditions['ref'];
    smp: ObservableMap<string, {
        a: {
            b: number;
        };
    }>;
    constructor(props: {});
    componentDidMount(): void;
    createConfig(): (import("../../../components/LegionsProConditions/ProConditionsUtils").ConditionSelectModel | import("../../../components/LegionsProConditions/ProConditionsUtils").ConditionTextNumberModel | import("../../../components/LegionsProConditions/ProConditionsUtils").ConditionRadioButtonModel | import("../../../components/LegionsProConditions/ProConditionsUtils").ConditionTextAreaModel | import("../../../components/LegionsProConditions/ProConditionsUtils").ConditionTextModel | import("../../../components/LegionsProConditions/ProConditionsUtils").ConditionDateModel | import("../../../components/LegionsProConditions/ProConditionsUtils").ConditionSearchModel | import("../../../components/LegionsProConditions/ProConditionsUtils").ConditionRangePickerModel | import("../../../components/LegionsProConditions/ProConditionsUtils").ConditionGroupCheckBoxModel)[];
    onChange(): void;
    render(): JSX.Element;
}
export {};
