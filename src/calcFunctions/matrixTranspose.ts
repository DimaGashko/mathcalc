/**
 * Возвращает транспонированную матрицу
 * 
 *```js
 * matrixTranspose([
 *    [1, 2, 3],
 *    [4, 5, 6],
 *    [7, 8, 9],
 * ]); 
 * // [1, 4, 7],
 * // [2, 5, 8],
 * // [3, 6, 9],
 * ```
 * 
 * @param matrix матрица (двумерный массив)
 * @returns транспонированная матрица
 */
export default function matrixTranspose(matrix: number[][]): number[][] {
   const m = matrix.length;
   if (m === 0) return [];

   const n = matrix[0].length;

   const tMatrix = new Array(n);
   for (let i = 0; i < n; i++) {
      tMatrix[i] = new Array(m);
   }

   for (let i = 0; i < m; i++) { 
      for (let j = 0; j < n; j++) { 
         tMatrix[j][i] = matrix[i][j];
      }
   }

   return tMatrix;
}