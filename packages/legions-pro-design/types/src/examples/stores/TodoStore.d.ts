import StoreBase, { IStoreBaseMeta } from '../../common/stores/StoreBase';
import { observablePromise } from 'legions/store-utils';
import { MockContainerEntity } from '../models/mockEntity';
interface IContext {
}
export interface ITriggerEventPrams {
    payload: {
        payloadModel: string;
        b: number;
    };
}
export default class TodoStore extends StoreBase<IContext> {
    static meta: IStoreBaseMeta;
    obMockData: observablePromise.PramsResult<MockContainerEntity>;
    constructor(context: any);
    watch: () => void;
    getMockData(): void;
    triggerEvent(payload: ITriggerEventPrams): void;
}
export {};
