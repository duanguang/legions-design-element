import MenuStore from "./MenuStore";
import TabPaneViewStore from './TabPaneStore';
import { ProxySanbox } from './ProxySanbox';
declare const LegionsStoreLayout: {
    TabPaneViewStore: typeof TabPaneViewStore;
    MenuStore: typeof MenuStore;
    ProxySanbox: typeof ProxySanbox;
};
export default LegionsStoreLayout;
