import { get, post } from 'legions/request';
import { MockContainerEntity } from '../models/mockEntity';
import { MockPageListEntity } from '../models/mockListEntity';

export function getMockData(){
   return new Promise((resolve)=>{
    let info=new MockContainerEntity({msg:'查询成功',ok:true,status:'',data:{id:1,companyId:2,loginId:3,user:{
      name:'小明',
      age:'22',
    }}});
    let timeNum = 5000;
    setTimeout(()=>{
      resolve(info)
    },timeNum)

  })
}
export function getMockListData(){
  return new Promise((resolve)=>{
    let data={page:1,records:1,pageSize:20,total:1,rows:[{id:1,companyId:2,loginId:3,name:'winter'}]}
    let list = new MockPageListEntity({msg:'查询成功',ok:true,status:'',data})
    let timeNum = 2000;
    setTimeout(()=>{
      resolve(list)
    },timeNum)
  })
}

