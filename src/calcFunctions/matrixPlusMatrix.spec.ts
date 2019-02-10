import { expect, assert } from 'chai';
import matrixPlusMatrix from './matrixPlusMatrix';

describe('matrixPlusMatrix', () => {
   it('Ошибка при разном количестве строк', () => {
      assert.throws(() => {
         matrixPlusMatrix(
            [
               [1, 2],
               [3, 4],
            ], [
               [1, 2],
               [3, 4],
               [5, 6],
            ]
         );

      }, 'Matrices must be the same length');
   });
 
   it('Ошибка при разном количестве столбцов', () => {
      assert.throws(() => {
         matrixPlusMatrix(
            [[1, 2, 3]], [[1]]
         );

      }, 'Matrices must be the same length');
   });
   
   describe('Тип: +', () => {

      it('Матрицы 1х1', () => {
         const res = matrixPlusMatrix([[5]], [[2]], '+');
   
         expect(res).to.have.deep.members([[7]]);
      });
   
      it('Матрицы 2х2', () => {
         const res = matrixPlusMatrix([
            [1, 2],
            [3, 4],
         ], [
            [2, 3],
            [4, 5],
         ], '+');
   
         expect(res).to.have.deep.members([
            [3, 5],
            [7, 9],
         ]);
      });
   
      it('Матрицы 2х3', () => {
         const res = matrixPlusMatrix([
            [1, 2, 3],
            [4, 5, 6],
         ], [
            [6, 5, 4],
            [3, 2, 1]
         ], '+');
   
         expect(res).to.have.deep.members([
            [7, 7, 7],
            [7, 7, 7],
         ]);
      });
   
      it('Матрицы 3х1', () => {
         const res = matrixPlusMatrix([
            [1],
            [2],
            [3],
         ], [
            [2],
            [2],
            [2],
         ], '+');
   
         expect(res).to.have.deep.members([
            [3],
            [4],
            [5],
         ]);
      });
   
      it('Матрицы 1х4', () => {
         const res = matrixPlusMatrix(
            [[1, 2, 3, 4]],
            [[2, 3, 4, 5]],
            '+'
         );
   
         expect(res).to.have.deep.members([[3, 5, 7, 9]]);
      });

      it('Плюс по умолчанию', () => {
         const res = matrixPlusMatrix(
            [[1, 2, 3, 4]],
            [[2, 3, 4, 5]],
         );
    
         expect(res).to.have.deep.members([[3, 5, 7, 9]]);
      });
   });

   describe('Тип: -', () => {
      it('Матрицы 1х1', () => {
         const res = matrixPlusMatrix([[5]], [[2]], '-');
   
         expect(res).to.have.deep.members([[3]]);
      });
   
      it('Матрицы 2х2', () => {
         const res = matrixPlusMatrix([
            [9, 8],
            [7, 6],
         ], [
            [1, 2],
            [3, 4],
         ], '-');
   
         expect(res).to.have.deep.members([
            [8, 6],
            [4, 2],
         ]);
      });
   
      it('Матрицы 2х3', () => {
         const res = matrixPlusMatrix([
            [1, 2, 3],
            [4, 5, 6],
         ], [
            [1, 2, 3],
            [4, 5, 6]
         ], '-');
   
         expect(res).to.have.deep.members([
            [0, 0, 0],
            [0, 0, 0],
         ]);
      });
   });

});