import { Component, OnInit } from '@angular/core';
import {ApiService} from '../_core/api.service';
@Component({
  selector: 'app-admin'
  , templateUrl: './admin.component.html'
  , styleUrls: ['./admin.component.scss', '../app.component.scss', '../free/free.component.scss']
  , providers: [ApiService]
})
export class AdminComponent implements OnInit {

  constructor(private Api: ApiService) { }

  ngOnInit() {
  }
  addDico(){
    this.Api.query('post', '/api/admin/add-dico').subscribe(data=>{
      console.log("data", data)
    })
  }
}
