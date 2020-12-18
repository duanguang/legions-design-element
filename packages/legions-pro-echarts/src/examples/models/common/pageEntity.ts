import { BaseEntity } from './baseEntity';
export interface IPageEntity<T>{
    total: number
     rows:Array<T>
     pageSize:number,
     page:number,
     records:number,
}
export class PageEntity<P> extends BaseEntity<IPageEntity<P>>{
   result:IPageEntity<P>={
     total: 0,
     rows:[],
     pageSize:10,
     page:1,
     records:0,
   };
    // tslint:disable-next-line: typedef
   constructor(fromJson,entity?){
      // @ts-ignore
       super(fromJson);
       if(fromJson){
           let result=fromJson.data;
           if(result){
               this.result.page=result.page||1;
               this.result.pageSize=result.pageSize||10;
               this.result.records=result.records||0;
               this.result.total=result.total||0;
               this.result.rows=super.transformArray(result.rows,entity);
           }
       }
   }
}
