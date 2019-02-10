/**
 * Скалярное умножение векторов
 * 
 * Размерность векторов должна быть одинаковой
 * 
 *```js
 * vecMulVec([1, 2], [3, 4]); // 3 + 8 = 11
 * vecMulVec([1, 2, 3], [3, 2, 1]); // 3 + 4 + 3 = 10
 * vecMulVec([1, 2], [1]); // error
 * ```
 * 
 * @param v1 первый вектор (массив чисел)
 * @param v2 второй вектор (массив чисел)
 */
export default function vecMulVec(v1: number[], v2: number[]): number {
   if (v1.length !== v2.length) {
      throw 'Vectors must be the same length';
   } 

   return v1.map((item, i) => item * v2[i])
      .reduce((res, item) => res + item);
}