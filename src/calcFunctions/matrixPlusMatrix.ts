/**
 * Суммирует две матрицы
 * 
 *```js
 * matrixMulNum([
 *    [1, 2, 3],
 *    [4, 5, 6],
 *    [7, 8, 9],
 * ], [
 *  [9, 8, 7],
 *  [6, 5, 4],
 *  [3, 2, 1],
 * ]); 
 * // [10, 10, 10],
 * // [10, 10, 10],
 * // [10, 10, 10],
 * ```
 * 
 * @param a первая матрица (в виде двумерного массива)
 * @param b вторая матрица (в виде двумерного массива)
 * @returns сумма двух матриц
 */
export default function matrixPlusMatrix(
   a: number[][], b: number[][], operator: '+' | '-' = '+'
): number[][] {
   const m1 = a.length;
   const m2 = b.length;

   if (m1 && m2 && (m1 !== m2 || a[0].length !== b[0].length)) {
      throw 'Matrices must be the same length';
   } 
   
   return a.map((row, i) => {
      return row.map((item1, j) => {
         const item2 = b[i][j];

         if (operator === '+') return item1 + item2;
         if (operator === '-') return item1 - item2;
      });
   });
}