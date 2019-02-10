/**
 * Суммирует два вектора
 * 
 * Размерность векторов должна быть одинаковой
 * 
 *```js
 * vecPlusVec([1, 2], [3, 4]); // [4, 6]
 * vecMulNum([1, 2, 3], [3, 2, 1]); // [4, 4, 4]
 * vecPlusVec([1, 2], [1]); // error
 * ```
 * 
 * @param v1 первый вектор (массив чисел)
 * @param v2 второй вектор (массив чисел)
 */
export default function vecPlusVec(v1: number[], v2: number[]): number[] {
   if (v1.length !== v2.length) {
      throw 'Vectors must be the same length';
   }

   return v1.map((item, i) => item + v2[i]);
}