import { expect, assert } from 'chai';
import matrixMulMatrix from './matrixMulMatrix';

describe('matrixMulMatrix', () => {
   it('Ошибка при несогласованных матрицах', () => {
      assert.throws(() => {
         matrixMulMatrix([
            [1, 2],
            [1, 2],
            [1, 2]
         ], [
            [1, 2, 3],
            [1, 2, 3],
            [1, 2, 3],
         ]);
      }, 'Matrices are inconsistent');
   });
   
   it('Test 1', () => {
      const res = matrixMulMatrix([
         [1, -1],
         [2, 0],
         [3, 0],
      ], [
         [1, 1],
         [2, 0],
      ]);

      expect(res).to.have.deep.members([
         [-1, 1],
         [2, 2],
         [3, 3]
      ]);
   });  
   
   it('Test 2', () => {
      const res = matrixMulMatrix([
         [1, 2, 1],
         [0, 1, 2],
      ], [
         [1, 0],
         [0, 1],
         [1, 1],
      ]);

      expect(res).to.have.deep.members([
         [2, 3],
         [2, 3],
      ]);
   });
   
   it('Test 3', () => {
      const res = matrixMulMatrix([
         [1, 0],
         [0, 1],
         [1, 1],
      ], [
         [1, 2, 1],
         [0, 1, 2],
      ]);

      expect(res).to.have.deep.members([
         [1, 2, 1],
         [0, 1, 2],
         [1, 3, 3]
      ]);
   });

});