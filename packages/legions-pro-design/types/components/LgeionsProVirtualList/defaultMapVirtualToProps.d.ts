declare const defaultMapToVirtualProps: ({ items, itemHeight, }: {
    items: any;
    itemHeight: any;
}, { firstItemIndex, lastItemIndex, }: {
    firstItemIndex: any;
    lastItemIndex: any;
}) => {
    virtual: {
        items: any;
        style: {
            height: number;
            paddingTop: number;
            boxSizing: string;
        };
    };
};
export default defaultMapToVirtualProps;
