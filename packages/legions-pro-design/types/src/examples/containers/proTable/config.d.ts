import React from 'react';
import { ProTable } from '.';
import { TableColumnConfig } from '../../../../es/interface/antd';
export declare abstract class PageListConfig<P, S = {}> extends React.Component<P, S> {
    instanceStatement: ProTable;
    constructor(props: P);
    registeredInstanceStatement(instance: ProTable): void;
    protected createTableColumnsConfig(): TableColumnConfig<{}>[];
}
