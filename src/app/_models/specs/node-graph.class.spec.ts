import { TestBed, async } from '@angular/core/testing';
import {Index, Title, Note} from '../node.class';
import {Graph, HeadGraph, ExtendGraph} from '../graph.class';

describe('ExtendGraph', () => {
  beforeEach(() => {
  });

  describe('Note: create an instance of note', ()=>{
    let eg = new ExtendGraph();
    let fake = {index:{uuid:"23456789", model:"blank"}, title:{uuid:"1234567", value:"title hello", course:false}, notes:[]}
    it('should be an instance of ExtendGraph', () => {
      expect(eg instanceof ExtendGraph).toBeTruthy();
    });
    it('should be an instance of title', () => {
      expect(eg.title instanceof Title).toBeTruthy();
    });
    eg.createExtendGraph(fake);
    it('should be an instance of title again', () => {
      expect(eg.title instanceof Title).toBeTruthy();
    });
    it('title uuid should be right', () => {
      expect(eg.title.uuid).toBe("1234567");
    });

  })

});
