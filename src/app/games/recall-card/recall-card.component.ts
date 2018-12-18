import { Component, OnInit, Input, Output, EventEmitter, HostListener } from '@angular/core';
//SERVICE
import {ApiService} from '../../_core/api.service';
//CLASS
import {Card} from '../../_models/special.class';
import {Index} from '../../_models/node.class';

@Component({
  selector: 'app-recall-card',
  templateUrl: './recall-card.component.html',
  styleUrls: ['./recall-card.component.scss', '../../app.component.scss']
})
export class RecallCardComponent implements OnInit {
  @Input() idx: Index;
  @Output() changeIndex: EventEmitter<any> = new EventEmitter();

  public card: Card = new Card();
  public index: Index = new Index();
  private getAnswer: boolean = false;

  constructor(private Api: ApiService) { }
  @HostListener('window:keydown', ['$event'])
    keyEvent(event:any) {
      if(event.key=="ArrowDown"){
        this.next();
      }
      if(event.key=="ArrowRight"){
        this.scoring("win");
      }
      if(event.key=="ArrowLeft"){
        this.scoring("lose");
      }
    }

  ngOnInit() :void{
    this.index.createIndex(this.idx);
    this.run();
  }
  public run():void{
    this.Api.query("get", "/api/recall/run", {idx_uuid:this.index.uuid}).subscribe(data => {
      // console.log(data)
      if(data.data.stat==204){
        // this.changeIndexRecallDeadline();
        this.changeIndex.emit({event:event});
      }else{
        this.card.createCard(data.data);
      }
    })
  }
  // public changeIndexRecallDeadline():void{
  //   this.Api.query("put", "/api/recall/update-index-recall-deadline", {idx_uuid:this.index.uuid}).subscribe(() => {
  //       this.changeIndex.emit({event:event});
  //   })
  // }
  public scoring(state){
    this.Api.query('put', `/api/recall/scoring`, {state:state, recall_uuid:this.card.recall.uuid, level:this.card.recall.level}).subscribe( () => {
      this.getAnswer = false;
      this.run();
    })
  }
  public next(){
    this.getAnswer = !this.getAnswer;
  }
  isEmpty(obj):boolean{ return obj.isEmpty() }

}
