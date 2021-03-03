import { default as StoreBase } from './StoreBase';
import { default as UiStoreBase } from './UiStoreBase';
declare const LegionsStore: {
    StoreBase: typeof StoreBase;
    UiStoreBase: typeof UiStoreBase;
    CollapsedResource: import("brain-store").IResource;
    MenuPanesStorageResource: import("brain-store").IResource;
    BreadCrumbsResourceEven: import("brain-store").IResource;
    project: {
        name: string;
    };
};
export default LegionsStore;
