import { expect } from 'chai';
import vecMulNum from './vecMulNum';

describe('vecMulNum', () => {

   it('Пустой вектор умноженный на число -> пустой вектор', () => {
      const res = vecMulNum([], 2);

      expect(res.length).to.be.equal(0);
   });

   it('{1, 2, 3, 4, 5} * 2 -> {2, 4, 6, 8, 10}', () => {
      const res = vecMulNum([1, 2, 3, 4, 5], 2);

      expect(res).to.have.members([2, 4, 6, 8, 10]);
   });

   it('{1, 2, 3, 4} * 0 -> {0, 0, 0, 0}', () => {
      const res = vecMulNum([1, 2, 3, 4, 5], 0);

      expect(res).to.have.members([0, 0, 0, 0, 0]);
   });

});