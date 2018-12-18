import { TestBed, async } from '@angular/core/testing';
import {UtilsService} from '../utils.service';
import {Note} from '../../_models/node.class';
import {HeadGraph} from '../../_models/graph.class';
//
// xdescribe('UtilsService', () => {
//   let service: UtilsService;
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       // imports:[Note],
//       providers: [UtilsService]
//     });
//   });
//   describe('Method: isEmptyObject(param:Object):boolean', ()=>{
//     it('should return a true for an empty object', () => {
//       service = TestBed.get(UtilsService);
//       expect(service.isEmptyObject({})).toBeTruthy();
//     });
//   })
//   xdescribe('Method: rootDoc():headGraph', ()=>{
//     it('should return false for no variable', () => {
//       service = TestBed.get(UtilsService);
//       expect(0).toBeFalsy();
//     });
//   })
//   xdescribe('Method: getNoteOrder(list:Array<>) :Array<>', ()=>{
//     let listOne = [{uuid:12, name:'Hello'}, {uuid:13, name:'World'}];
//     let objOne = {uuid:13, value:'World', code_label:8.1};
//     it('should return 2', () => {
//       service = TestBed.get(UtilsService);
//       expect(service.getNoteOrder(listOne).length).not.toBe(2);
//     });
//     xit('should return undefined', () => {
//       service = TestBed.get(UtilsService);
//       expect(service.getNoteOrder(listTwo)).toBeUndefined();
//     });
//     xit('should not return 1', () => {
//       service = TestBed.get(UtilsService);
//       expect(service.getNoteOrder([{uuid:13, value:'World'}]).length).not.toBe(1);
//     });
//     xit('should return 1', () => {
//       let firstNote = new Note();
//       firstNote.createByNote(objOne);
//       service = TestBed.get(UtilsService);
//       expect(service.getNoteOrder([firstNote.get()]).length).toBe(1);
//     });
//     it('should be truly', () => {
//       service = TestBed.get(UtilsService);
//       let firstNote = new Note();
//       expect(service.test(firstNote)).toBeTruthy();
//     });
//
//   })
// });
