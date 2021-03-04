import { default as StoreBase } from './StoreBase';
import { default as UiStoreBase } from './UiStoreBase';
import { ClassOf } from 'legions-lunar/types/api/typescript';
declare function getStore<T extends InstanceType<typeof StoreBase>>(store: ClassOf<T>): T;
declare const LegionsStore: {
    StoreBase: typeof StoreBase;
    UiStoreBase: typeof UiStoreBase;
    CollapsedResource: import("brain-store").IResource;
    MenuPanesStorageResource: import("brain-store").IResource;
    BreadCrumbsResourceEven: import("brain-store").IResource;
    project: {
        name: string;
    };
    get: typeof getStore;
};
export default LegionsStore;
