import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
// EXTRA LIBS
import {ContextMenuService, ContextMenuComponent} from 'ngx-contextmenu';
import 'rxjs/Rx';
declare var $: any;
import * as io from 'socket.io-client';
//SERVICES
import {ApiService} from '../_core/api.service';
import {NavigationService} from '../_core/navigation.service';
import {UtilsService} from '../_core/utils.service';

//CLASSES
import {Index, Title, Note} from '../_models/node.class';
import {HeadGraph, ExtendGraph, RowGraph, ExtendHeadGraph, ExtendColumnGraph} from '../_models/graph.class';
import {Common} from '../_models/common.data';
import { environment } from '../../environments/environment';


@Component({
  moduleId:module.id
  ,selector:'app-dico'
  ,templateUrl:'./dico.component.html'
  ,styleUrls:['./dico.component.scss', '../app.component.scss', '../free/free.component.scss']
  ,providers:[ApiService, NavigationService, UtilsService]
})
export class DicoComponent implements OnInit {
  @ViewChild('languageMenu') public languageMenu: ContextMenuComponent;
  @ViewChild('extendHeadGraphMenu') public extendHeadGraphMenu: ContextMenuComponent;

  @Input() public hg: HeadGraph;
  @Output() public addHg: EventEmitter<any> = new EventEmitter();
  @Output() public delHg: EventEmitter<any> = new EventEmitter();
  @Output() public move: EventEmitter<any> = new EventEmitter();

  private component_name = "dico";
  // private baseUrl = 'http://localhost:3200';
  private baseUrl:string = environment.apiAddress;
  public labels: any = [];
  public traductions: any = [];
  public ehg: ExtendHeadGraph = new ExtendHeadGraph();
  public ecg: any = [];
  public rg: RowGraph = new RowGraph();
  public selectedNoteLabel: any = {};

  constructor(
    private Api: ApiService
    , private Nav: NavigationService
    , public Utils:UtilsService
    , private contextMenuService:ContextMenuService
  ) {
    let common = new Common();
    this.labels = common.getLabelsByType(this.component_name);
    this.traductions = common.getLabelsByType("language");
    console.log("this.baseUrl", this.baseUrl)
  }

  ngOnInit() {
    this.getMain();
  }

  // CREATE --------------------------------------------------------------------

  public addItem():void{
    let params = {
      idx_uuid: this.ehg.index.uuid
      , code_label: 8.1
    };
    this.Api.query('post', '/api/dico/create-item', params).subscribe(data => {
      // console.log(data)
      let x = new RowGraph();
      x.setRowGraph(data.data);
      this.ehg.addToItem(x);
    }, error=> console.log(error))
  }
  public addTraduction(code_label:Number):void{
    this.Api.query('post', '/api/dico/create-traduction', {item_uuid:this.ecg[0].traduction.uuid, code_label:code_label}).subscribe(data => {
      this.ecg.push({traduction:data.data});
      console.log('addTraduction::: this.ecg', this.ecg)
    },error=> console.log(error))
  }
  public addDefinition():void{
    let params = {
      note_uuid: this.rg.traduction.uuid
    };
    this.Api.query('post', '/api/dico/create-definition', params).subscribe(data => {
      let y = new Note();
      y.createNote(data.data);
      this.rg.setDefinition(y);
      console.log("addDefinition this.rg", this.rg)
      let x = new RowGraph();
      x.createRowGraph(JSON.parse(JSON.stringify(data.data)))
      this.ecg[this.rg.index] = x;
      console.log("addDefinition this.ecg", this.ecg)
    }, error=> console.log(error))
  }

  // READ   --------------------------------------------------------------------

  public onDocument(next:HeadGraph):void{
    this.addHg.emit({event:event, item:next});
  }
  public getMain():void{
    this.Api.query('get', '/api/dico/read-extend-head-graph', {idx_uuid:this.hg.index.uuid}).subscribe(data=>{
      this.ehg.setExtendHeadGraph(data.data.index, data.data.title, data.data.item)
    }, error=>{console.log(error)})
  }

  public getExtendColumnGraph(item:RowGraph):void{
    this.Api.query('get', '/api/dico/read-extend-column-graph', {item_uuid:item.traduction.uuid}).subscribe(data=>{
      this.ecg = data.data;
    },error=>{console.log(error)})
  }
  public selectRowGraph(item:any, index:number):void{
    this.rg = new RowGraph();
    this.rg.setIndex(index);
    let x = JSON.parse(JSON.stringify(item))
    this.rg.createRowGraph(x);
  }
  public selectLanguage(ev:MouseEvent, item:Note):void{
    this.selectedNoteLabel = item;
    this.contextMenuService.show.next({ contextMenu: this.languageMenu, event: ev, item: {} });
    ev.preventDefault();
    ev.stopPropagation();
  }
  public unselectExtendColumnGraph():void{
    this.ecg = [];
    this.rg=new RowGraph();
  }

  // UPDATE --------------------------------------------------------------------

  public updateWordLanguage(item:any):void{
    if(this.rg.traduction.code_label!=item.code_label){
      let params = {first_uuid:this.ecg[0].traduction.uuid, up_uuid:this.rg.traduction.uuid, code_label:item.code_label};
      this.Api.query('put', '/api/dico/update-traduction-label',params).subscribe(data=>{
        let x = new Note();
        x.createNote(data.data);
        this.ecg[this.rg.index].traduction = x;
        this.rg=new RowGraph();
      }, error=> console.log(error));
    }
  }
  public updateWordValue():void{
    if(this.ecg[this.rg.index].traduction.value!=this.rg.traduction.value){
      let params = {item_uuid:this.ecg[0].traduction.uuid, up_uuid:this.rg.traduction.uuid, value:this.rg.traduction.value};
      this.Api.query('put', '/api/dico/update-traduction-value',params).subscribe(data=>{
        let x = new Note();
        x.createNote(data.data);
        this.ecg[this.rg.index].traduction = x;

        let y = new Note();
        y.createNote(JSON.parse(JSON.stringify(data.data)));
        this.rg.setTraduction(y);

        // Actualiser la liste des items si la traduction est aussi un item
        if(this.rg.index==0){
          for(var i=0; i<this.ehg.item.length; i++){
            if(this.ehg.item[i].traduction.uuid===this.rg.traduction.uuid){
              let z = new Note();
              z.createNote(data.data);
              let y = new RowGraph();
              y.setTraduction(JSON.parse(JSON.stringify(z)));
              this.ehg.item[i] = y;
            }
          }
        }
      }, error=> console.log(error));
    }
  }
  public updateDefinitionValue():void{
    if(this.ecg[this.rg.index].definition.value!=this.rg.definition.value){
      if(!this.rg.definition.value.length){
        // console.log('check update definition is null');
        this.deleteDefinition();
      }else{
        let params = {def_uuid:this.rg.definition.uuid, value:this.rg.definition.value};
        this.Api.query('put', '/api/dico/update-definition',params).subscribe(data=>{
          let x = new Note();
          x.createNote(data.data);
          this.ecg[this.rg.index].definition = x;
          let y = new Note();
          y.createNote(JSON.parse(JSON.stringify(data.data)));
          this.rg.setDefinition(y);
        }, error=> console.log(error));
      }
    }
  }

  togglerecallableStatus(status:string, descendant:boolean):void{
    // this.Api.query('put', '/api/games-recall-one/status', {idx_uuid:this.ehg.index.uuid, status, descendant}).subscribe( () => {
    // this.Api.query('put', '/api/recall/update-recallable-state', {idx_uuid:this.ehg.index.uuid, status, descendant}).subscribe( () => {
    //   this.ehg.title.recallable = status;
    // }, error => {console.log(error)});
    let socket = io(this.baseUrl+'/games');
    socket.on('connect', ()=>{
      // console.log('updateBrutData on connect')
      socket.emit('update-recallable-state', {status:status, idx_uuid:this.hg.index.uuid, descendant:descendant, token:this.Api.getToken()});
      socket.on('update-recallable-state-response', (s) => {
        console.log('s',s)
        if(s=='successed' || s== 'failed'){
          socket.close();
        }
      });
    })
  }

  // DELETE --------------------------------------------------------------------

  public deleteDocument():void{
    this.Api.query('delete', '/api/document/delete-document', {idx_uuid:this.ehg.index.uuid}).subscribe(()=>{
      this.delHg.emit(null);
    }, error => {console.log(error)});
  }
  public deleteDefinition():void{
    this.Api.query('delete', '/api/dico/delete-definition', {def_uuid:this.rg.definition.uuid}).subscribe(()=>{
      console.log('this.rg before', this.rg);
      console.log('this.ecg before', this.ecg);
      this.rg.setDefinition(new Note());
      delete this.ecg[this.rg.index].definition;
      console.log('this.rg after', this.rg);
      console.log('this.ecg after', this.ecg);
    }, error => {console.log(error)});
  }
  public deleteRow():void{
    this.Api.query('delete', '/api/dico/delete-traduction', {traduction_uuid:this.rg.traduction.uuid}).subscribe(()=>{
      for(var i=0; i<this.ecg.length; i++){
        if(this.ecg[i].traduction.uuid===this.rg.traduction.uuid){
          this.ecg.splice(i, 1);
          break;
        }
      };
      // Update ExtendHeadGraph
      for(var i=0; i<this.ehg.item.length; i++){
        if(this.ehg.item[i].traduction.uuid===this.rg.traduction.uuid){
          if(this.ecg.length!=0){
            this.ehg.item[i]=this.ecg[0];
          }else{
            this.ehg.item.splice(i, 1);
          }
          break;
        }
      };
      this.rg=new RowGraph();
    }, error => {console.log(error)});
  }


  // MISCELLANEOUS -------------------------------------------------------------
  public isEmptyObject(obj) : boolean {
    return this.Utils.isEmptyObject(obj)
  }
}
