export class Common {
  private labels = [
    {designation:"Undefined", type:"special", code_label:1.1}
    , {designation:"Title", type:"special", code_label:1.2}
    , {designation:"Reference", type:"who", code_label:2.1}
    , {designation:"Author", type:"who", code_label:2.2}
    , {designation:"Founder", type:"who", code_label:2.3}
    , {designation:"Owner", type:"who", code_label:2.4}
    , {designation:"Citation", type:"who", code_label:2.5}
    , {designation:"Origin", type:"who", code_label:2.6}
    , {designation:"Context", type:"what", code_label:3.1}
    , {designation:"Analogy", type:"what", code_label:3.2}
    , {designation:"Example", type:"what", code_label:3.3}
    , {designation:"Introduction", type:"what", code_label:3.4}
    , {designation:"Story", type:"what", code_label:3.5}
    , {designation:"Subject", type:"why", code_label:4.1}
    , {designation:"Goal", type:"why", code_label:4.2}
    , {designation:"Problem", type:"why", code_label:4.3}
    , {designation:"Synthese", type:"why", code_label:4.4}
    , {designation:"Principe", type:"how", code_label:5.1}
    , {designation:"Definition", type:"how", code_label:5.2}
    , {designation:"Property", type:"how", code_label:5.3}
    , {designation:"Theorem", type:"how", code_label:5.4}
    , {designation:"Rule", type:"how", code_label:5.5}
    , {designation:"Method", type:"how", code_label:5.6}
    , {designation:"Procedure", type:"how", code_label:5.7}
    , {designation:"Summary", type:"how", code_label:5.8}
    , {designation:"Date", type:"when", code_label:6.1}
    , {designation:"Duration", type:"when", code_label:6.2}
    , {designation:"Period", type:"when", code_label:6.3}
    , {designation:"Question", type:"extra", code_label:7.1}
    , {designation:"Exercice", type:"extra", code_label:7.2}
    , {designation:"Response", type:"extra", code_label:7.3}
    , {designation:"Solution", type:"extra", code_label:7.4}
    , {designation:"English", type:"language", code_label:8.1}
    , {designation:"French", type:"language", code_label:8.2}
    , {designation:"Spanish", type:"language", code_label:8.3}
    , {designation:"Portugese", type:"language", code_label:8.4}
    , {designation:"German", type:"language", code_label:8.5}
  ];
  private freeLabelMenu = [
    {type:"who", list:[
      {designation:"Reference", code_label:2.1}
      , {designation:"Author", code_label:2.2}
      , {designation:"Founder", code_label:2.3}
      , {designation:"Owner", code_label:2.4}
      , {designation:"Citation", code_label:2.5}
      , {designation:"Origin", code_label:2.6}
    ]}
    ,{type:"what", list:[
      {designation:"Context", code_label:3.1}
      , {designation:"Analogy", code_label:3.2}
      , {designation:"Example", code_label:3.3}
      , {designation:"Introduction", code_label:3.4}
      , {designation:"Story", code_label:3.5}
    ]}
    ,{type:"why", list:[
      {designation:"Subject", code_label:4.1}
      , {designation:"Goal", code_label:4.2}
      , {designation:"Problem", code_label:4.3}
      , {designation:"Synthese", code_label:4.4}
    ]}
    ,{type:"how", list:[
      {designation:"Principe", code_label:5.1}
      , {designation:"Definition", code_label:5.2}
      , {designation:"Property", code_label:5.3}
      , {designation:"Theorem", code_label:5.4}
      , {designation:"Rule", code_label:5.5}
      , {designation:"Method", code_label:5.6}
      , {designation:"Procedure", code_label:5.7}
      , {designation:"Summary", code_label:5.8}
    ]}
    ,{type:"when", list:[
      {designation:"Date", code_label:6.1}
      , {designation:"Duration", code_label:6.2}
      , {designation:"Period", code_label:6.3}
    ]}
    ,{type:"extra", list:[
      {designation:"Question", code_label:7.1}
      , {designation:"Exercice", code_label:7.2}
      , {designation:"Response", code_label:7.3}
      , {designation:"Solution", code_label:7.4}
    ]}
  ];
  private models = [
    {name:"blank", module:"document", labels:[1.2, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2,5.3, 5.4, 5.5, 5.6,5.7,6.1,6.2,6.3, 7.1,7.2,7.3,7.4], native_label:[], optional_label:[2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2,5.3, 5.4, 5.5, 5.6,5.7,6.1,6.2,6.3, 7.1,7.2,7.3,7.4]}
    ,{name:"dico", module:"document", labels:[5.2, 8.1,8.2,8.3], native_label:[], optional_label:[5.2, 8.1,8.2,8.3]}
    ,{name:"book", module:"document", labels:[1.2, 2.2, 5.8], native_label:[2.2, 5.8], optional_label:[2.1,2.5,5.8]}
    ,{name:"section-book", module:"document", native_label:[], optional_label:[2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 3.1, 3.2, 3.3, 3.4, 3.5, 4.1, 4.2, 4.3, 4.4, 5.1, 5.2,5.3, 5.4, 5.5, 5.6,5.7,6.1,6.2,6.3, 7.1,7.2,7.3,7.4]}
    ,{name:"table", module:"document", labels:[], native_label:[], optional_label:[2.1]}
  ];
  constructor(){}

  // ================================================================== LABELS
  public getLabels():any{
    return this.labels;
  }
  // public getLabelsByModelCode(model_code:number):any{
  //   let code_label_list = this.models.find(x=>x.code_name==model_code).labels;
  //   return this.labels.filter(x=> {
  //     return code_label_list.includes(x.code_label);
  //   });
  // }
  public getLabelsByType(type:string):any{
    return this.labels.filter(x=>x.type==type);
  }
  public getLabelByCode(code_label:number):any{
    return this.labels.find(x=>x.code_label==code_label)
  }
  public getLabelInTree():any{

  }
  // ================================================================== MODELS
  public getModels():any{
    return this.models;
  }
  // public getModelByGraph(graph:string):any{
  //   return this.models.find(x=>x.graph==graph);
  // }
  // ================================================================== OPTIONAL LABELS
  public getOptionalLabelList(model:string) :any{
    let optionalList = this.models.find( x=> x.name===model ).optional_label;
    let list = [];
    for(var i=0; i<optionalList.length; i++){
      for(var j=0; j<this.labels.length; j++){
          optionalList[i] === this.labels[j].code_label ? list.push(this.labels[j]) : null
      }
    }
    return list;
  }
  // ================================================================== FREE
  public getFreeLabelMenu():any{
    return this.freeLabelMenu;
  }
}
