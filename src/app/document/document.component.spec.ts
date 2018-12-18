import { async, ComponentFixture, TestBed, inject} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ContextMenuModule} from 'ngx-contextmenu';
import {ClickOutsideModule} from 'ng4-click-outside';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner'; //loading spinner
import {DndModule} from 'ng2-dnd'; //Drag and drop

import { LabelComponent } from '../_directives/label.directive';
import { TabulationDirective } from '../_directives/tabulation.directive';
import { ModelIconComponent } from '../_directives/model-icon.component';

import { DocumentComponent } from './document.component';
import { DocRootComponent } from '../doc-root/doc-root.component';
import { FreeComponent } from '../free/free.component';
import { DicoComponent } from '../dico/dico.component';

import{ ApiService } from '../_core/api.service';
import {UtilsService} from '../_core/utils.service';
import {NavigationService} from '../_core/navigation.service';
import {AuthenticationService} from '../_core/authentication.service';

import {AppModule} from '../app.module';

// xdescribe('DocumentComponent', () => {
//   let component: DocumentComponent;
//   let fixture: ComponentFixture<DocumentComponent>;
//   let api;
//
//   beforeEach(async(() => {
//     // TestBed.configureTestingModule({
//     //   declarations: [ LabelComponent, TabulationDirective, ModelIconComponent, DocumentComponent, DocRootComponent, FreeComponent, DicoComponent ]
//     //   , imports: [FormsModule, ContextMenuModule, ClickOutsideModule, Ng4LoadingSpinnerModule, DndModule, HttpClientTestingModule]
//     //   ,providers: [ApiService, UtilsService, NavigationService, AuthenticationService]
//     // })
//     TestBed.configureTestingModule({imports:[AppModule]})
//     .compileComponents();
//   }));
//
//   beforeEach(() => {
//     fixture = TestBed.createComponent(DocumentComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//     api = TestBed.get(ApiService);
//   });
//
//   // it('should create', () => {
//   //   expect(component).toBeTruthy();
//   // });
//   // it('should call api service', async(inject([],api:ApiService, httpClient:HttpTestingController)=>{
//   //   expect(api).toBeTruthy();
//   //   // api.query('get', '/api/document/get-main').then(data=>{
//   //   //   expect(data.data.length).toEqual(0);
//   //   // })
//   // }));
//   // it('Service injected via inject(...) and TestBed.get(...) should be the same instance',
//   //   inject([ApiService], (injectService: ApiService) => {
//   //     expect(injectService).toBe(testBedService);
//   //   })
//   // );
// });
