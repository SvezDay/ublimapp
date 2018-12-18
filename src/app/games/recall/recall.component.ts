import {Component, OnInit, AfterViewInit} from '@angular/core';
import {Location} from '@angular/common';
//SERVICE
import {NavigationService} from '../../_core/navigation.service';
import {IntercomService} from '../../_core/intercom.service';
import {UtilsService} from '../../_core/utils.service';
import {ApiService} from '../../_core/api.service';
//CLASS
import {Index} from '../../_models/node.class';

@Component({
  moduleId: module.id
  ,selector: 'app-recall'
  ,templateUrl: './recall.component.html'
  ,styleUrls: ['./recall.component.scss', '../../app.component.scss']
  ,providers:[ApiService, NavigationService, UtilsService, IntercomService]
})
export class RecallComponent implements OnInit {
  public list: Array<any> = [];
  public selectedIndex: Index = new Index();

  constructor(private Api:ApiService) { }

  ngOnInit() {
    this.getList();
  }
  public getList():void{
    this.Api.query('get', '/api/recall/main-list').subscribe( data => {
      console.log('data', data);
      this.list = data.data;
    })
  }
  public call(index:Index):void{
    this.selectedIndex.createIndex(index);
    // console.log('this.selectedIndex', this.selectedIndex)
    // console.log('this.selectedIndex', this.isEmpty(this.selectedIndex)
  }

  public updateList():void{
    this.Api.query('get', '/api/recall/update-list').subscribe( data => {
      // console.log('data', data);
      this.list = data.data;
    })
  }
  public changeIndex():void{
    for(var i=0; i<this.list.length; i++){
      if(this.list[i].index.uuid===this.selectedIndex.uuid){
        this.list.splice(i, 1);
        this.selectedIndex = new Index();
      }
    }
  }

  isEmpty(obj):boolean{ return obj.isEmpty() }

}
