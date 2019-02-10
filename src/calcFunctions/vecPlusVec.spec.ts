import { expect, assert } from 'chai';
import vecPlusVec from './vecPlusVec';

describe('vecPlusVec', () => {

   it('Ошибка при разных размерностях', () => {
      assert.throws(() => {
         vecPlusVec([1, 2, 3], [1]);
      }, 'Vectors must be the same length');
   });

   it('Сумма пустых векторов -> пустой вектор', () => {
      const res = vecPlusVec([], []);

      expect(res.length).to.be.equal(0);
   });

   it('{1, 2, 3} + {3, 2, 1} -> {4, 4, 4}', () => {
      const res = vecPlusVec([1, 2, 3], [3, 2, 1]);

      expect(res).to.have.members([4, 4, 4]);
   });

   it('{1, 2} + {-1, -2} -> {0, 0}', () => {
      const res = vecPlusVec([1, 2], [-1, -2]);

      expect(res).to.have.members([0, 0]);
   });

});