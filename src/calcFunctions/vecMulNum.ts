/**
 * Умножает вектор на число
 * 
 *```js
 * vecMulNum([1, 2, 3], 2); // [2, 4, 6]
 * vecMulNum([1, 2, 3, 4], 3); // [3, 6, 9, 12]
 * ```
 * 
 * @param vec вектор (массив чисел, размерность может быть любой)
 * @param num число на которое нужно умножить вектор
 * @returns вектор умноженный на число
 */
export default function vecMulNum(vec: number[], num: number): number[] { 
   return vec.map(item => item * num);
}
