import { expect } from 'chai';
import matrixMulNum from './matrixMulNum';

describe('matrixMulNum', () => {
   it('Матрица 1х1', () => {
      const res = matrixMulNum([[5]], 2);

      expect(res).to.have.deep.members([[10]]);
   }); 

   it('Матрица 2х2', () => {
      const res = matrixMulNum([
         [1, 2],
         [3, 4],
      ], 3);

      expect(res).to.have.deep.members([
         [3, 6],
         [9, 12],
      ]);
   });
   
   it('Матрица 2х3', () => {
      const res = matrixMulNum([
         [1, 2, 3],
         [4, 5, 6],
      ], 2);

      expect(res).to.have.deep.members([
         [2, 4, 6],
         [8, 10, 12],
      ]);
   });

   it('Матрица 3х1', () => {
      const res = matrixMulNum([
         [1],
         [2],
         [3],
      ], 4);

      expect(res).to.have.deep.members([
         [4],
         [8],
         [12],
      ]);
   });

   it('Матрица 1х4', () => {
      const res = matrixMulNum([[1, 2, 3, 4]], 2);

      expect(res).to.have.deep.members([[2, 4, 6, 8]]);
   });

});