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
  ,selector: 'app-activity'
  ,templateUrl: './activity.component.html'
  ,styleUrls: ['./activity.component.scss', '../app.component.scss', '../free/free.component.scss']
  ,providers:[ApiService, UtilsService, NavigationService]
})
export class ActivityComponent implements OnInit {
  @Input() public hg: HeadGraph;
  @Output() public addHg: EventEmitter<any> = new EventEmitter();
  @Output() public delHg: EventEmitter<any> = new EventEmitter();
  @Output() public move: EventEmitter<any> = new EventEmitter();

  private component_name = "activiy";
  public doc: ExtendGraph = new ExtendGraph();
  public originalNoteOrder: any = {};
  public selectedNote: Note;
  public selectedNoteLabel: any = {};
  public selectedToMove: any = null;


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
  ) { }

  ngOnInit() {
    // this.getMain();
  }

  // CREATE   --------------------------------------------------------------------
  // READ   ----------------------------------------------------------------------
  // public getMain() :void{
  //   // console.log("getMain free");
  //   this.Api.query('post', '/api/activity/read', this.hg.index).subscribe( data => {
  //     this.selectedNote = new Note();
  //     this.doc = new ExtendGraph();
  //     this.doc.createExtendGraph(data.data)
  //     this.originalNoteOrder = this.Utils.getNoteOrder(this.doc.notes);
  //   }, error=>{console.log(error)})
  // }
  // UPDATE   --------------------------------------------------------------------
  // DELETE  ---------------------------------------------------------------------

}
