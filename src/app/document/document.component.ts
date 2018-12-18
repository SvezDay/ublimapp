import { Component, OnInit, ViewChild, Output, ElementRef, HostListener } from '@angular/core';
// EXTRA LIBS
import {ContextMenuService, ContextMenuComponent} from 'ngx-contextmenu';
import 'rxjs/Rx';
declare var $: any;
//SERVICES
import {ApiService} from '../_core/api.service';
import {NavigationService} from '../_core/navigation.service';
import {UtilsService} from '../_core/utils.service';

//CLASSES
import {Uuid} from '../_models/node.class';
import {HeadGraph, Tree} from '../_models/graph.class';

@Component({
  moduleId: module.id
  ,selector: 'app-document'
  ,templateUrl: './document.component.html'
  ,styleUrls: ['./document.component.scss', '../app.component.scss', '../free/free.component.scss']
  ,providers:[ApiService, NavigationService, UtilsService]
})
export class DocumentComponent implements OnInit {
    @ViewChild('documentMainMenu') public documentMainMenu: ContextMenuComponent;
    @ViewChild('treeModal') public treeModal: ElementRef;

    private component_name = "document";
    public tree: Tree = new Tree();
    public idx2Move: string;

    public path: Array<HeadGraph> = [];
    public documentLastOfPath: HeadGraph = new HeadGraph();
    public selectedTitle: any = {};

    constructor(
      private Api: ApiService
      , private Nav: NavigationService
      , public Utils:UtilsService
      , private contextMenuService:ContextMenuService
    ) {
      
    }

    ngOnInit() {
      // console.log("check ngOnInit() DocumentComponent")
      this.path = this.Nav.getPath(); //Init the path localStorage if necessary
      // console.log('before this.Nav.getLastInPath()', this.Nav.getLastInPath())
      this.documentLastOfPath = new HeadGraph();
      let lip=this.Nav.getLastInPath();
      this.documentLastOfPath.setHeadGraph(lip.index, lip.title);
      // console.log(' this.documentLastOfPath before createInstance', this.documentLastOfPath)

    }

  // CREATE --------------------------------------------------------------------

    public addPath(ev){
      this.Nav.addToPath(ev.item);
      this.ngOnInit();
    }

    // READ   --------------------------------------------------------------------

    public onPathClick(item:HeadGraph):void{
      this.path = this.Nav.updatePath(item);
      this.documentLastOfPath = new HeadGraph();
      this.documentLastOfPath.setHeadGraph(item.index, item.title);
    }
    public selectTitle(item:HeadGraph):void{
      // TOGGLE FUNCTION TO CHECK IF SELECTED OR NOT AND THEN USE AS DOC COPY OBJECT
      this.selectedTitle = Object.assign({}, item.title);
      setTimeout(()=>{
        let el = $(`input#selectedTitle`);
        el.focus();
      }, 0)
    }
    public initTree(ev):void{

      this.idx2Move = ev.idx_uuid;
      this.showTree(this.idx2Move);
    }
    public showTree(uuid:string):void{
      let params = !!uuid ? {idx_uuid: uuid} : {}
      // console.log("chech item show tree data", params)
      this.Api.query('get', '/api/tree', params).subscribe( data => {
       console.log("display show tree data", data)

        Promise.resolve()
        .then(()=> {
          // this.tree.init(data.data)
          this.tree.setHeadGraph(data.data.headGraph);
          this.tree.setAncestor(data.data.ancestor);
          this.tree.setTitleDescendant(data.data.titleDescendant);
          this.tree.setNoteDescendant(data.data.noteDescendant);
        })
        .then(()=> {
          console.log("this.tree", this.tree)
          if(this.isEmptyObject(this.tree.headGraph)){
            this.tree.headGraph = new HeadGraph();
            // this.tree.headGraph.createRoot();
            this.tree.headGraph.setRoot();
          }else if(this.tree.ancestor.index==null){
            this.tree.ancestor = new HeadGraph();
            // this.tree.ancestor.createRoot();
            this.tree.ancestor.setRoot();
          }
        }).then(()=>{
          $(this.treeModal.nativeElement).modal('show');
          console.log("display show tree data", this.tree)
          return;
        })
      })
    }

    // UPDATE --------------------------------------------------------------------

    public updateTitle():void{
      // CHECK IF VALUE HAS CHANGE
      let last = this.Nav.getLastInPath();
      if(last.title.value != this.selectedTitle.value){
        let params = {
          idx_uuid: last.index.uuid
          , up_uuid: this.selectedTitle.uuid
          , value: this.selectedTitle.value
        };
        console.log('update title param', params)
        this.Api.query('put', '/api/document/update-title', params).subscribe( data => {
          // this.doc = Object.assign({}, data.data);
          // this.originalNoteOrder = this.Utils.getNoteOrder(data.data.notes)
          console.log("update title", data)
          this.Nav.removeLastInPath();
          this.Nav.addToPath(data.data)
          this.path = this.Nav.getPath();
        }, error => { console.log(error) });
      }
      this.selectedTitle = {};
    }
    moveIn(withDescendant:boolean):void{
      let params = {idx_uuid: this.idx2Move, destination_uuid:this.tree.headGraph.title.uuid}
      params["withDescendant"] = withDescendant;
      // CHECK IF NOT THE SAME PLACE
      this.Api.query('post', '/api/tree/move', params).subscribe( data => {
        console.log("data")
        //
        $(this.treeModal.nativeElement).modal('hide');
        this.Nav.removeLastInPath();
        this.ngOnInit();
      }, error=>{console.log(error) })
    }
    // DELETE --------------------------------------------------------------------
    public deletePath(ev):void{
      this.Nav.removeLastInPath();
      this.ngOnInit();
    }
    // MISCELLANEOUS -------------------------------------------------------------
    public isEmptyObject(obj):boolean{ return this.Utils.isEmptyObject(obj) }


  }
