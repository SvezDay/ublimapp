import { Component, OnInit, ViewChild, Output, Input, EventEmitter } from '@angular/core';
// EXTRA LIBS
import {ContextMenuService, ContextMenuComponent} from 'ngx-contextmenu';
import 'rxjs/Rx';
declare var $: any;
//SERVICES
import {ApiService} from '../_core/api.service';
import {NavigationService} from '../_core/navigation.service';

//CLASSES
import {Graph, HeadGraph} from '../_models/graph.class';

@Component({
  moduleId: module.id
  ,selector: 'app-doc-root'
  ,templateUrl: './doc-root.component.html'
  ,styleUrls: ['./doc-root.component.scss', '../app.component.scss']
  ,providers:[ApiService, NavigationService]
})
export class DocRootComponent implements OnInit {
  @Input() public hg: HeadGraph;
  @Output() public addHg: EventEmitter<any> = new EventEmitter();

  public list: Array<HeadGraph> = [];
  private g: Graph;

  constructor(
    private Api: ApiService
    , private Nav: NavigationService
    , private contextMenuService:ContextMenuService
  ) {
    this.g = new Graph();
  }

  ngOnInit() :void{
    // console.log('init doc-root')
    this.getMain();
  }
  public addDocument(model:string) :void{
    // console.log('data.data', data.data)
    this.Api.query('post', '/api/document/create-document', {model:model}).subscribe( data => {
      // console.log('data.data', data.data)
      let d = new HeadGraph();
      d.createHeadGraph(data.data)
      this.list.push(d);
    }, error => {console.log(error)});
  }
  public getMain():void{
    this.Api.query('get', '/api/document/get-main').subscribe(data=>{

      console.log('data.data', data.data)
      this.list = this.g.createHeadGraphArray(data.data);
      // console.log("list", this.list)
    }, error => {console.log(error)})
  }
  public onDocument(item:HeadGraph):void{
    // console.log('onDocument(ev:Event,item:HeadGraph)', ev)
    // console.log('onDocument(ev:Event,item:HeadGraph)', item)
    this.addHg.emit({item:item });
  }

}
