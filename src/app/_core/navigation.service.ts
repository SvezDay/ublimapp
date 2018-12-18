import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import{HeadGraph} from '../_models/graph.class';

@Injectable()
export class NavigationService {
  // the root documentation is the docs component
  // private headGraphRoot= {index:{uuid:null, model:null}, title:{uuid:null,value:"Home",course:false, descendant:[]}};
  private headGraphRoot = new HeadGraph();
  constructor( private Router:Router ) { }

  componentNavigation(next:HeadGraph, component_name:string):void{
    // console.log('componentNavigation : next:', next)
    // console.log('componentNavigation : component_name:', component_name)
    // Check if root
    if(!next.index.uuid){
    // console.log('componentNavigation : !next.index.uuid', !next.index.uuid)
      // Redirect to the root if the component who call the method is not the root (aka DocumentComponent)
      if(component_name!='document'){
      // console.log('componentNavigation : component_name!=document', component_name!='document')
        this.Router.navigate(['/document']);
      }
    }
    // Redirect if the next model is different of the component who call the method
    else if(next.index.model != component_name){
      // console.log('componentNavigation : next.index.model != component_name', next.index.model != component_name)
        this.Router.navigate([`/${next.index.model}`]);
    }
  }

  initRootPath(){
    let root = this.headGraphRoot.setRoot();
    localStorage.setItem('rudlab_path', JSON.stringify([this.headGraphRoot]))
  }

  addToPath(headGraph:HeadGraph):Array<HeadGraph>{
    let path:Array<HeadGraph> = this.getPath();
    let hg = new HeadGraph()
    hg.setHeadGraph(headGraph.index, headGraph.title);
    path.push(hg);
    localStorage.setItem('rudlab_path', JSON.stringify(path));
    return path;
  }
  getPath(){
    let str: string = localStorage.getItem('rudlab_path') || "";
    let path = (!str.length || str === '[null]') ? "" : JSON.parse( str );
    if(!path.length){
      this.initRootPath();
      return this.getPath();
    }else{
      return path;
    }
  }
  getLastInPath():HeadGraph{
    let path:Array<HeadGraph> = this.getPath();
    return path.reverse()[0];
  }
  updatePath(graph:HeadGraph) :Array<HeadGraph> {
    let path:Array<HeadGraph> = this.getPath();
    let cp = path;
    for(let i = path.length-1; i >= 0; i--){
        if(path[i].index.uuid != graph.index.uuid){
            cp.pop();
        }else{
            break;
        }
    }
    localStorage.setItem('rudlab_path', JSON.stringify(cp));
    return cp;
  }
  removeLastInPath():void{
    let path:Array<HeadGraph> = this.getPath();
    if(path.length>1){
      path.pop();
      localStorage.setItem('rudlab_path', JSON.stringify(path));
    }
  }

}
