export default Handle;
declare class Handle {
    static mousedownHandle(me: any, e: any, direction: any): void;
    static mouseupHandle(me: any): void;
    static onZooming(zoomable: any, position?: {}): void;
    static topMove(me: any, event: any): void;
    static rightMove(me: any, event: any): void;
    static bottomMove(me: any, event: any): void;
    static leftMove(me: any, event: any): void;
    static width(me: any): {
        res: any;
        min: any;
        max: any;
    };
    static height(me: any): {
        res: any;
        min: any;
        max: any;
    };
    static calculation(me: any, type: any): any;
    static offset(me: any, basic: any, change: any, type: any): any;
}
