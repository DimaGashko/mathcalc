import { expect } from 'chai';
import matrixTranspose from './matrixTranspose';

describe('matrixTranspose', () => {
   it('Матрица 1х1', () => {
      const res = matrixTranspose([[5]]);

      expect(res).to.have.deep.members([[5]]);
   }); 

   it('Матрица 2х2', () => {
      const res = matrixTranspose([
         [1, 2],
         [3, 4],
      ]);

      expect(res).to.have.deep.members([
         [1, 3],
         [2, 4],
      ]);
   });
   
   it('Матрица 2х3', () => {
      const res = matrixTranspose([
         [1, 2, 3],
         [4, 5, 6],
      ]);

      expect(res).to.have.deep.members([
         [1, 4],
         [2, 5],
         [3, 6],
      ]);
   });

   it('Матрица 3х1', () => {
      const res = matrixTranspose([
         [1],
         [2],
         [3],
      ]);

      expect(res).to.have.deep.members([[1, 2, 3]]);
   });

   it('Матрица 1х4', () => {
      const res = matrixTranspose([[1, 2, 3, 4]]);

      expect(res).to.have.deep.members([
         [1],
         [2],
         [3],
         [4],
      ]);
   });

});