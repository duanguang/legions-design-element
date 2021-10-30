import { default as StoreBase } from './StoreBase';
import { default as UiStoreBase } from './UiStoreBase';
import { ClassOf } from 'legions-lunar/types/api/typescript';
declare function getStore<T extends InstanceType<typeof StoreBase>>(store: ClassOf<T>): T;
declare const LegionsStore: {
    StoreBase: typeof StoreBase;
    UiStoreBase: typeof UiStoreBase;
    CollapsedResource: import("brain-store/types/api/resourceEvent").IResource;
    MenuPanesStorageResource: import("brain-store/types/api/resourceEvent").IResource;
    BreadCrumbsResourceEven: import("brain-store/types/api/resourceEvent").IResource;
    project: {
        name: string;
    };
    /** 获取指定store 实例 */
    get: typeof getStore;
};
export default LegionsStore;
