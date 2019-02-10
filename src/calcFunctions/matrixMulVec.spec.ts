import { expect, assert } from 'chai';
import matrixMulVec from './matrixMulVec';

describe('matrixMulVec', () => {
   it('Ошибка когда матрица и вектор не согласованы', () => {
      assert.throws(() => {
         matrixMulVec([
            [1, 2],
            [1, 2],
            [1, 2]
         ], [1, 2, 3]);
      }, 'The matrix and the vector are inconsistent');
   });
   
   it('Test 1', () => {
      const res = matrixMulVec([
         [2, 4, 0],
         [-2, 1, 3],
         [-1, 0, 1],

      ], [1, 2, -1]);

      expect(res).to.have.deep.members([
         [10],
         [-3],
         [-2]
      ]);
   }); 
   
   it('Test 2', () => {
      const res = matrixMulVec([
         [1, 2, 3],
         [1, 2, 3],

      ], [3, 2, 1]);

      expect(res).to.have.deep.members([
         [10],
         [10],
      ]);
   }); 
   
});