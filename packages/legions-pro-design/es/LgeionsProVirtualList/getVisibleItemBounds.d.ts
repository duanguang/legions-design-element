declare const getVisibleItemBounds: (list: any, container: {
    innerHeight: number;
    clientHeight: number;
}, items: any, itemHeight: any, itemBuffer: any) => {
    firstItemIndex: number;
    lastItemIndex: number;
};
export default getVisibleItemBounds;
