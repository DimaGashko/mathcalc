import { expect } from 'chai';
import vecAbs from './vecAbs';

describe('vecAbs', () => {

   it('|{}| -> 0', () => {
      const res = vecAbs([]);

      expect(res).to.be.equal(0);
   });

   it('|{6}| -> 6', () => {
      const res = vecAbs([6]);

      expect(res).to.be.equal(6);
   });

   it('|{3, 4}| -> 5', () => {
      const res = vecAbs([3, 4]);

      expect(res).to.be.equal(5);
   });

   it('|{2, 3, 6}| -> 7', () => {
      const res = vecAbs([2, 3, 6]);

      expect(res).to.be.equal(7);
   });

});