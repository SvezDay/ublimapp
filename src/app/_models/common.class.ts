// export class CommonMethod {
//
// }
//
// export class Uuid {
//   pattern: "^(\w){8}-(\w){4}-(\w){4}-(\w){4}-(\w){12}$";
// }
// export class Index {
//   public uuid: string;
//   public model: string;
//   constructor(uuid:string, model:string){
//     this.uuid = uuid;
//     this.model = model;
//   }
// }
// export class Title {
//   public uuid: string;
//   public value: string;
//   public course: boolean;
//   public descendant: HeadGraph[];
//   constructor(uuid:string, value:string, course:boolean, des:HeadGraph){
//     this.uuid = uuid;
//     this.value = value;
//     this.course = course;
//     this.descendant = [des];
//   }
// }
// export class Note {
//   public uuid: string;
//   public value: string;
//   public code_label:number;
//   public descendant: HeadGraph[];
//   // constructor(uuid:string, value:string, code_label:number, des:HeadGraph){
//   //   this.uuid = uuid;
//   //   this.value = value;
//   //   this.code_label = code_label;
//   //   this.descendant = [des];
//   // }
//   constructor(){
//     this.uuid = null;
//     this.value = null;
//     this.code_label = null;
//     this.descendant = null;
//   }
//   createByNote(obj){
//     this.uuid = obj.uuid;
//     this.value = obj.value;
//     this.code_label = obj.code_label;
//   }
//   get(){
//     return this;
//   }
// }
// export class HeadGraph {
//   public index: Index;
//   public title: Title;
//   constructor(){
//     this.index = null;
//     this.title = null;
//   }
//   createRoot(){
//     this.index = {uuid:null, model:null};
//     this.title = {uuid:null, value:"Home", course: false, descendant: []};
//   }
//   create(i:Index, t:Title){
//     this.index = i;
//     this.title = t;
//   }
//   createByHeadGraph(hg:HeadGraph){
//     this.index = hg.index;
//     this.title = hg.title;
//   }
//   createByExtendGraph(eg:ExtendGraph){
//     this.index = eg.index;
//     this.title = eg.title;
//   }
// }
// export class ExtendGraph {
//   public index: Index;
//   public title: Title;
//   public notes: Note[];
//   constructor(){
//     this.index = null;
//     this.title = null;
//     this.notes = null;
//   }
//   create(i:Index, t:Title, n:Note){
//     this.index = i;
//     this.title = t;
//     this.notes = [n];
//   }
//   createByExtendGraph(eg:ExtendGraph){
//     this.index = eg.index;
//     this.title = eg.title;
//     // this.notes = eg.notes;
//   }
// }
// // export class ColumnGraph {
// //   constructor(){}
// // }
//
// export class RowGraph {
//   public language: Note;
//   public definition: Note;
//   constructor(){
//   }
//   create(obj){
//     this.language = obj.language;
//     this.definition = obj.definition;
//   }
// }
// export class Tree {
//   public headGraph: HeadGraph;
//   public ancestor: HeadGraph;
//   public titleDescendant: HeadGraph[];
//   public noteDescendant: HeadGraph[];
//   constructor(){
//     this.ancestor = new HeadGraph();
//     this.headGraph = new HeadGraph();
//     this.titleDescendant = [];
//     this.noteDescendant = [];
//   }
//   init(params){
//     this.headGraph = params.headGraph;
//     this.ancestor = params.ancestor;
//     this.noteDescendant = params.noteDescendant;
//     this.titleDescendant = params.titleDescendant;
//   }
// }
// export class SetGame {
//   public recall: any;
//   public from: any;
//   public to: any;
//   constructor(){
//     this.recall = {};
//     this.from = {};
//     this.to = {};
//   }
// }
