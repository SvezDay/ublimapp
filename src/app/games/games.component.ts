import {Injectable, Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Location} from '@angular/common';
// import {HttpClient} from '@angular/common/http';
import * as io from 'socket.io-client';
// import { Socket } from 'ng-socket-io';
import {ApiService} from '../_core/api.service';
import {NavigationService} from '../_core/navigation.service';
import {UtilsService} from '../_core/utils.service';
import {AuthenticationService} from '../_core/authentication.service';
import {SocketService} from '../_core/socket.service';
import { environment } from '../../environments/environment';

@Component({
  moduleId: module.id
  , selector: 'app-games'
  , templateUrl: './games.component.html'
  , styleUrls: ['./games.component.scss', '../free/free.component.scss', '../app.component.scss']
  , providers:[ApiService, NavigationService, UtilsService]
})
export class GamesComponent implements OnInit {
  public recalls: any = [];
  public file: any = {name: ""};
  private baseUrl = 'http://localhost:3200';

  constructor(
    private api: ApiService
    , private Nav: NavigationService
    , private utils: UtilsService
  ) {
  }

  ngOnInit() {
    // this.http.get(`${this.baseUrl}`);
    // this.Socket.emit('gamesConnection');
    // this.api.query('get', '/').subscribe(data=>{
    //   console.log("root done", data)
    // })
  }

  getSuspended(){
    this.api.query('get', `/api/games/suspended`).subscribe( data => {
        // console.log(data)
        this.recalls = data.data;
    })
  }
  activation(ruid){
    let params = {recall:{uuid:ruid}, status:true};
    // console.log(params)
    this.api.query('put', `/api/games-recall-one/recallStatus`, params).subscribe( () => {
      this.getSuspended();
    })
  }
  updateBrutData():void{
    // console.log('file', this.file.name)
    // let socket = io(this.baseUrl+'/games');
    // socket.on('connect', ()=>{
    //   // console.log('updateBrutData on connect')
    //   socket.emit('updateBrutData', {file:this.file.name, token:this.api.getToken()});
    //   socket.on('updateBrutDataResponse', (s) => {
    //     console.log('s',s)
    //     if(s=='successed' || s== 'failed'){
    //       socket.close();
    //     }
    //   });
    // })
    this.api.query('put', `/api/games/update-brut-data`,{file:this.file.name}).subscribe( () => {
      console.log("done");
    })
  }

}
