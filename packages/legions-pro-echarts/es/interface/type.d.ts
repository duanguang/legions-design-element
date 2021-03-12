/**
 *  使用 typescript 有时候需要重写一个库提供的 interface 的某个属性，但是重写 interface 有可能会导致冲突：
 *  原理是，将 类型 T 的所有 K 属性置为 any，
 *  然后自定义 K 属性的类型，
 *  由于任何类型都可以赋予 any，所以不会产生冲突
*/
export declare type Weaken<T, K extends keyof T> = {
    [P in keyof T]: P extends K ? any : T[P];
};
