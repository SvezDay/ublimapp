import {Uuid, Index, Title, Note} from './node.class';

export class Graph {
  createHeadGraphArray(arr:Array<any>):Array<HeadGraph>{
    let list = [];
    for(var i=0; i<arr.length; i++){
      let hg = new HeadGraph();
      hg.createHeadGraph(arr[i]);
      list.push(hg);
    }
    return list;
  }
  createNoteArray(arr:Array<any>):Array<Note>{
    let list = [];
    for(var i=0; i<arr.length; i++){
      let n = new Note();
      n.createNote(arr[i]);
      list.push(n);
    }
    return list;
  }
}

export class HeadGraph {
  index:Index;
  title:Title;
  setHeadGraph(i:Index, t:Title){
    this.index.createIndex(i); this.title.createTitle(t);
  }
  setRoot(){
    this.title.setValue('Home');
  }
  createHeadGraph(obj){
    this.setHeadGraph(obj.index, obj.title);
  }
  isEmpty(){
    return this.index.isEmpty();
  }
  constructor(){
    this.index=new Index(); this.title=new Title();
  }
}
export class ExtendGraph {
  index:Index;
  title:Title;
  notes: Note[]
  setIndex(i:Index){
    this.index.createIndex(i);
  }
  setTitle(t:Title){
    this.title.createTitle(t);
  }
  setExtendGraph(i:Index, t:Title, ns?:Note[]){
    this.setIndex(i); this.setTitle(t);
    if(ns instanceof Array && !!ns.length){
      let arr = [];
      for(var j = 0; j< ns.length; j++){
        let n = new Note();
        n.createNote(ns[j]);
        arr.push(n)
      }
      this.notes = arr;
    }
  }
  createNoteArray(arr:Array<any>) :Array<Note>{
    let list = [];
    for(var i=0; i<arr.length; i++){
      let n = new Note();
      n.createNote(arr[i]);
      list.push(n);
    }
    return list;
  }
  createExtendGraph(obj) :void{
    let i; let t;
    if(!(obj.index instanceof Index)){
      i = new Index();
      i.createIndex(obj.index);
    }
    if(!(obj.title instanceof Title)){
      t = new Title();
      t.createTitle(obj.title);
      // console.log('check title', t)
    }
    if(obj.notes === 'undefined'){
      this.setExtendGraph(i, t);
    }else{
      let noteList = [];
      if(!(obj.notes instanceof Array)){
        // noteList = this.createNoteArray(obj.notes);
        let g= new Graph();
        noteList = g.createNoteArray(obj.notes);
      }else{
        noteList = obj.notes;
      }
      this.setExtendGraph(i, t, noteList);
    }
  }
  isEmpty(){
    return this.index.isEmpty();
  }
  constructor(){
    this.index=new Index(); this.title=new Title(); this.notes=[];
  }
}
export class Tree {
  public headGraph?: HeadGraph;
  public ancestor?: HeadGraph;
  public titleDescendant?: HeadGraph[];
  public noteDescendant?: HeadGraph[];
  setHeadGraph(h:HeadGraph){this.headGraph=h};
  setAncestor(a:HeadGraph){this.ancestor=a};
  setTitleDescendant(t:HeadGraph[]){this.titleDescendant=t};
  setNoteDescendant(n:HeadGraph[]){this.noteDescendant=n};
  setTree(h:HeadGraph, a:HeadGraph, t:HeadGraph[], n:HeadGraph[]){
    this.setHeadGraph(h); this.setAncestor(a); this.setTitleDescendant(t); this.setNoteDescendant(n);
  }
  // createTree(obj:{h:HeadGraph, a:HeadGraph, t:HeadGraph[], n:HeadGraph[]}){
  //   this.setAll(obj.h, obj.a, obj.t, obj.n);
  // }
  constructor(){
    this.headGraph=new HeadGraph(); this.ancestor=new HeadGraph(); this.titleDescendant=[]; this.noteDescendant=[];
  }
  // init(params){
  //   this.headGraph = params.headGraph;
  //   this.ancestor = params.ancestor;
  //   this.noteDescendant = params.noteDescendant;
  //   this.titleDescendant = params.titleDescendant;
  // }
}
export class ExtendHeadGraph {
  public index: Index;
  public title: Title;
  public item: RowGraph[];

  setIndex(i:Index){this.index=i};
  setTitle(t:Title){this.title=t};
  setItem(n:RowGraph[]){this.item=n};
  addToItem(n:RowGraph){
    this.item.push(n);
  }
  setExtendHeadGraph(i:Index, t:Title, r?:any){
    this.index=i; this.title=t;
    if(r instanceof Array && !!r.length){
      let list=[];
      for(var j=0; j<r.length; j++){
        let note = new Note();
        note.setNote(r[j].uuid, r[j].value, r[j].code_label)
        let nr = new RowGraph();
        nr.setRowGraph(note);
        list.push(nr);
      }
      this.setItem(list);
    }
  }
  // createExtendHeadGraph(obj){
  // this.index=obj.i; this.title=obj.t; this.item=obj.n;
  // }
  constructor(){
    this.index=new Index(); this.title=new Title(); this.item=[];
  }
}
export class ExtendColumnGraph {
  public list: RowGraph[];
  setExtendColumnGraph(l:RowGraph[]){this.list=l};
  // createExtendColumnGraph(obj){
  //   this.list = obj.list;
  // }
  constructor(){
    this.list=[];
  }
}
export class RowGraph {
  public traduction: Note;
  public definition: Note;
  public index:number;
  setTraduction(t){
    let nt;
    if(!(t instanceof Note)){
      nt = new Note();
      nt.createNote(t);
    }else{
      nt = t;
    }
    this.traduction=nt;
  };
  setDefinition(d){
    let nd;
    if(!(d instanceof Note)){
      nd = new Note();
      nd.createNote(d);
    }else{
      nd = d;
    }
    this.definition=nd
  };
  setIndex(i:number){this.index=i};
  setRowGraph(l:Note, d?:Note){
    this.traduction=l;
    d instanceof Array && !!d.length ? this.definition=d : null
  }
  createRowGraph(obj){
    this.setTraduction(obj.traduction);
    obj.hasOwnProperty('definition') ? this.setDefinition(obj.definition) : null
  }
  isEmpty(){
    if(this.traduction instanceof Note){
      return this.traduction.isEmpty();
    }
    return true;
  }
  // createRowGraph(obj){
  //   this.traduction = obj.traduction;
  //   this.definition = obj.definition;
  // }
  constructor(){
    this.traduction=new Note(); this.definition=new Note();
  }
}
export class SetGame {
  public recall: any;
  public from: any;
  public to: any;
  constructor(){
    this.recall = {};
    this.from = {};
    this.to = {};
  }
}
