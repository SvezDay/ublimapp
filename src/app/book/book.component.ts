
import {Component, OnInit, AfterViewInit, ViewChild, ElementRef, OnChanges, DoCheck, Input, Output, EventEmitter, ViewEncapsulation, SimpleChanges, HostListener, Renderer} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Location} from '@angular/common';
//EXTRA LIBS
import {ContextMenuService, ContextMenuComponent} from 'ngx-contextmenu';
import {Observable} from 'rxjs/Rx';
declare var $: any;
//SERVICES
import {ApiService} from '../_core/api.service';
import {NavigationService} from '../_core/navigation.service';
import {UtilsService} from '../_core/utils.service';
import {IntercomService} from '../_core/intercom.service';

//CLASSES
// import {Index, Title, Note, HeadGraph, ExtendGraph} from '../_models/common.class';
import {Uuid, Index, Title, Note} from '../_models/node.class';
import {HeadGraph, ExtendGraph, Tree} from '../_models/graph.class';
import {Common} from '../_models/common.data';


@Component({
  moduleId: module.id
  ,selector: 'app-book'
  ,templateUrl: './book.component.html'
  ,styleUrls: ['./book.component.scss', '../app.component.scss', '../free/free.component.scss']
  ,providers:[ApiService, UtilsService, NavigationService]
})
export class BookComponent implements AfterViewInit {
  // @HostListener("document:click", ['$event']) onWindowClickZone(ev){
  //   // Principe: The following code will extract and return only one event and block any other
  //   // Property: the zone-note(for the value) is parent of the zone-label and zone-descendant
  //   // Mecanisme: when a click occured to a child, the event will register the class name of the child and then that of parents
  //   // Example: if click on zone descendant the event recover an array with zone-descendant as first value plus zone-note
  //   let re = /^(custm-zone-)([a-zA-Z]{0,})$/i;
  //   let zone;
  //
  //   console.log("chech scrolling", ev)
  //   ev.path.forEach((x, i)=>{
  //     // console.log("path item", x.classList)
  //     if(!!x.classList && !!x.classList.length && !zone){
  //       x.classList.forEach(y=>{
  //         let res = y.match(re);
  //         if(res!=null){
  //           zone=res[2];
  //         }
  //       })
  //     }
  //   })
  //   console.log('the user has click on the zone:', zone);
  // }

  @Input() public hg: HeadGraph;
  @Output() public addHg: EventEmitter<any> = new EventEmitter();
  @Output() public delHg: EventEmitter<any> = new EventEmitter();
  @Output() public move: EventEmitter<any> = new EventEmitter();

  @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;
  @ViewChild('labelMenu') public labelMenu: ContextMenuComponent;

  private component_name = "book";
  public doc: any = {};
  public originalNoteOrder: any = {};
  public selectedNote: Note;
  public selectedNoteLabel: any = {};
  public selectedToMove: any = null;

  public num = 50;

  public common: Common = new Common();
  public labels: any = [];

  constructor(
    private ActivatedRoute: ActivatedRoute
    , private Router: Router
    , private Api: ApiService
    , private Nav: NavigationService
    , private location: Location
    , private Utils: UtilsService
    , private intercom: IntercomService
    , private contextMenuService:ContextMenuService
    , private renderer: Renderer
  ) {
    this.labels = this.common.getOptionalLabelList(this.component_name);
  }

  ngAfterViewInit() {}
  ngOnChanges(changes:SimpleChanges){
    this.selectedNote = new Note();
    !!changes.hg ? this.getMain() : null
  }

// CREATE ----------------------------------------------------------------------

  createNote(codeLabel:number):void{
    let params = {
      model:this.doc.index.model
      , code_label:codeLabel
      , parent_uuid: !!this.doc.notes.length ? this.doc.notes[this.doc.notes.length-1].uuid : this.doc.title.uuid
    };
    console.log("createNote() params", params);
    this.Api.query('post', '/api/document/create-note', params).subscribe( data => {
      let n = new Note();
      n.createNote(data.data);
      this.doc.notes.push(n);
      this.originalNoteOrder = this.Utils.getNoteOrder(this.doc.notes)
    }, error => {console.log(error)});
  }
  public addDocument(model:string) :void{
    let params = {model:model, parent_uuid:this.doc.title.uuid};
    console.log('params', params)
    console.log('this.doc', this.doc)
    this.Api.query('post', '/api/document/create-document', params).subscribe( data => {
      console.log('data', data)
      let hg = new HeadGraph();
      hg.createHeadGraph(data.data);
      this.doc.title.descendant.push(hg);
      this.onDocument(hg);
    }, error => {console.log(error)});
  }

// READ   ----------------------------------------------------------------------

  // public onDocument(next:HeadGraph):void{
  //   this.addHg.emit({event:event, item:next});
  // }
  getOrignalNote(){
    return this.doc.notes.filter( item => { return item.uuid == this.selectedNote.uuid })[0];
  }
  public getMain() :void{
    console.log("this.hg", this.hg)
    this.Api.query('get', '/api/document/read-extend-document', {idx_uuid:this.hg.index.uuid}).subscribe( data => {
      console.log("getMain data", data)
      this.doc = new ExtendGraph();
      this.doc.createExtendGraph(data.data);
      console.log("this.doc", this.doc)
      // this.doc = Object.assign({}, data.data);
      // this.originalNoteOrder = this.Utils.getNoteOrder(data.data.notes);
      this.originalNoteOrder = this.Utils.getNoteOrder(this.doc.notes);
    }, error=>{console.log(error)})
  }
  selectNote(ev:Event, note:Note, index:number){
    if(this.selectedNote.uuid == note.uuid){ return }
    this.selectedNote = new Note();
    this.selectedNote.setNote(note.uuid, note.value, note.code_label);
    this.selectedNote.setIndex(index);
    let el = $(`textarea#${note.uuid}`);
    let h = el.scrollHeight;
    el.height(h+15);
  }
  public selectNoteLabel(ev: MouseEvent, item: any, index:number):void{
    this.selectedNoteLabel = item;
    Object.assign(this.selectedNoteLabel, item)
    Object.assign(this.selectedNoteLabel, {index:index})

    this.contextMenuService.show.next({
      // Optional - if unspecified, all context menu components will open
      contextMenu: this.labelMenu,
      event: ev,
      item: {},
    });
    // console.log(ev)
    ev.preventDefault();
    ev.stopPropagation();
  }
  public onDocument(next:HeadGraph):void{
    this.addHg.emit({event:event, item:next});
  }

// UPDATE ----------------------------------------------------------------------

  onDropSuccess(){
    // console.log('check onDropSuccess')
    // console.log('Before: this.originalNoteOrder::',this.originalNoteOrder )
    let currentNoteOrder = this.Utils.getNoteOrder(this.doc.notes);
    // console.log('currentNoteOrder', currentNoteOrder)
    // console.log('originalNoteOrder', this.originalNoteOrder)
    if(currentNoteOrder != this.originalNoteOrder){
    // console.log('check Difference between now and before')
      let params = {
        idx_uuid:this.doc.index.uuid
        , order_list: currentNoteOrder
      };
      this.Api.query('put', '/api/free/update-order', params).subscribe(result=>{
        this.originalNoteOrder = currentNoteOrder;
        // console.log('After: this.originalNoteOrder::',this.originalNoteOrder )
      }, error => {console.log(error)});
    }
  }
  public updateLabel(code_label:number):void{
    if(this.selectedNoteLabel.code_label != code_label){
      let params= {
        idx_uuid: this.doc.index.uuid
        ,up_uuid: this.selectedNoteLabel.uuid
        ,code_label: code_label
      }
      this.Api.query('put', '/api/free/update-note-label', params).subscribe( data => {
        this.doc = Object.assign({}, data.data);
        this.originalNoteOrder = this.Utils.getNoteOrder(data.data.notes)
      }, error => console.log(error) )
    }
  }
  public updateNote(){
    // console.log('updateNote: this.selectedNote:: ', this.selectedNote)
    let originalNote = this.getOrignalNote();
    if(originalNote.value != this.selectedNote.value){
      this.intercom.spinnerOn();
      let params = {
        idx_uuid: this.doc.index.uuid
        , up_uuid: this.selectedNote.uuid
        , value: this.selectedNote.value
      };

      this.Api.query('put', '/api/free/update-note-value', params).subscribe( data => {
        this.doc = Object.assign({}, data.data);
        this.originalNoteOrder = this.Utils.getNoteOrder(data.data.notes)

        this.intercom.spinnerOff();
      }, error => {
        console.log(error)
        this.intercom.spinnerOff();
      });
    }
    // this.selectedNote = {};
    this.selectedNote = new Note();
    // console.log("this.selectedNote.isEmpty()", this.selectedNote.isEmpty())
  }
  togglerecallableStatus(status, des){
    let params = {idx_uuid:this.doc.index.uuid, status, des}
    // console.log('params', params)
    // this.Api.query('put', '/api/games-recall-one/status', params).subscribe( () => {
    this.Api.query('put', '/api/games/update-recallable-state', params).subscribe( () => {
      this.doc.title.recallable = status;
    }, error => {console.log(error)});
  }

  // DELETE --------------------------------------------------------------------

  public deleteDocument(){
    this.Api.query('delete', '/api/document/delete-document', {idx_uuid:this.doc.index}).subscribe( () => {
        this.delHg.emit(null)
    }, error => {console.log(error)});
  }
  public deleteNote(){
    let params = {idx_uuid: this.doc.index.uuid, note_uuid: this.selectedNote.uuid};
    this.Api.query('delete', '/api/document/delete-note', params)
    .finally(()=>{ this.selectedNote = new Note() })
    .subscribe( () => {
      this.doc.notes.forEach((n, i)=>{
        if(n.uuid==this.selectedNote.uuid){
          this.doc.notes.splice(i, 1);
        }
      })
    }, error => {console.log(error)});
  }

  // MISCELLANEOUS -------------------------------------------------------------
  isEmptyObject(obj):boolean{ return this.Utils.isEmptyObject(obj) }

}
