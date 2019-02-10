/**
 * Умножает матрицу на число
 * 
 *```js
 * matrixMulNum([
 *    [1, 2, 3],
 *    [4, 5, 6],
 *    [7, 8, 9],
 * ], 3); 
 * // [2, 4, 6],
 * // [8, 10, 12],
 * // [14, 16, 18],
 * ```
 * 
 * @param matrix матрица (в виде двумерного массива)
 * @returns матрица умноженная на число
*/
export default function matrixMulNum(matrix: number[][], num: number): number[][] {
   return matrix.map((row) => { 
      return row.map((item) => item * num);
   });
}