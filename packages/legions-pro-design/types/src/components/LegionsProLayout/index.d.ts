import { MenuBaseModel, MenuModel, BaseModel } from './model';
import { legionsProLayoutProps } from './interface';
import './style/index.less';
declare const LegionsProLayout: {
    (props: legionsProLayoutProps['main']): JSX.Element;
    MenuModel: typeof MenuModel;
    MenuBaseModel: typeof MenuBaseModel;
    BaseModel: typeof BaseModel;
    LegionsStoreLayout: {
        TabPaneViewStore: typeof import("./store/TabPaneStore").default;
        MenuStore: typeof import("./store/MenuStore").default;
        ProxySanbox: typeof import("./store/ProxySanbox").ProxySanbox;
    };
};
export default LegionsProLayout;
