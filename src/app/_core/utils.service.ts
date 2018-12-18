import {Injectable} from '@angular/core';
import {Note} from '../_models/node.class';


@Injectable()
export class UtilsService {

  test(n:Note):boolean{
    return n instanceof Note ? true : false
  }

  isEmptyObject(obj){
    // console.log("object as parameter of isEmptyObject", Object.keys(obj))
    if(!obj || typeof obj != 'object'){
      return;
    }else if(obj && Object.keys(obj).length == 0){
      return true;
    }else{
      return false;
    }
  }

  rootDoc(){
    return { index:{uuid:null, model:null}, title:{uuid: null, value:'Home', course: false, descendant:[]} }
  }
  // getRootHeadGraph(){ return {idx_uuid:null, idx_model:null,tit_uuid:null, tit_value:"Home"} }

  getNoteOrder(list:Note[]):Array<string>{
    // if(!(list instanceof Array)){
    //   throw new Error('the arg is not of type array')
    // }else{
      let order = []
      for( let i in list){
        order.push(list[i].uuid)
      }
      return order;
    // }
  }
  getNoteUuidOrder(list){
    let order = []
    for( let i in list){
      order.push({uuid: list[i].uuid})
    }
    return order;
  }

}
