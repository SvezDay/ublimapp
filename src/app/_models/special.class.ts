export class Recall {
  public uuid: string;
  public level: number;
  setUuid(u:string){this.uuid=u};
  setLevel(l:number){this.level=l};
  createRecall(obj){
    this.setUuid(obj.uuid);
    this.setLevel(obj.level);
  }
  isEmpty(){
    return this.uuid == "" ? true : false
  }
  constructor(){this.uuid=""; this.level=0; }
}
export class Elem {
  public uuid: string;
  public value: string;
  public code_label: number;
  setUuid(u:string){this.uuid=u};
  setValue(v:string){this.value=v};
  setCodeLabel(c:number){this.code_label=c};
  createElem(obj){
    this.setUuid(obj.uuid);
    this.setValue(obj.value);
    this.setCodeLabel(obj.code_label);
  }
  isEmpty(){
    return this.uuid == "" ? true : false
  }
  constructor(){this.uuid=""; this.value=""; this.code_label=0; }
}

export class Card {
  public recall: Recall;
  public q: Elem;
  public a: Elem;
  createCard(obj){
    this.recall.createRecall(obj.recall);
    this.q.createElem(obj.q);
    this.a.createElem(obj.a);
  }
  constructor(){
    this.recall = new Recall();
    this.q = new Elem();
    this.a = new Elem();
  }
  isEmpty(){
    return this.recall.isEmpty();
  }
}
