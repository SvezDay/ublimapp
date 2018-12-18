import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class IntercomService {

  constructor(){}
  private emitDataSource = new Subject<any>();
  public dataEmitted = this.emitDataSource.asObservable();

  private emitSpinnerOnSource = new Subject<any>();
  private emitSpinnerOffSource = new Subject<any>();

  public spinnerOnEmitted = this.emitSpinnerOnSource.asObservable();
  public spinnerOffEmitted = this.emitSpinnerOffSource.asObservable();

  emitData(data: any){
    this.emitDataSource.next(data);
  }
  spinnerOn(){
    this.emitSpinnerOnSource.next();
  }
  spinnerOff(){
    this.emitSpinnerOffSource.next();
  }

}
