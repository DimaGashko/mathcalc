import { expect, assert } from 'chai';
import vecMulVec from './vecMulVec';

describe('vecMulVec', () => {

   it('Ошибка при разных размерностях', () => {
      assert.throws(() => {
         vecMulVec([1, 2, 3], [1]);
      }, 'Vectors must be the same length');
   });

   it('{1, 2} * {3, 4} -> 11', () => {
      const res = vecMulVec([1, 2], [3, 4]);

      expect(res).to.be.equal(11);
   });

   it('{1, 2, 3} * {3, 2, 1} -> 10', () => {
      const res = vecMulVec([1, 2, 3], [3, 2, 1]);

      expect(res).to.be.equal(10);
   });

});