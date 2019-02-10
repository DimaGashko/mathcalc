import '../polyfills/mathHypotPolyfill'

/**
 * Возвращает модуль числа
 * 
 *```js
 * vecAbs([3, 4]); // sqrt(9 + 16) = 25
 * vecAbs([2, 3, 6]); // sqrt(4 + 9 + 36) = 7
 * ```
 * 
 * @param vec вектор (массив чисел, размерность может быть любой)
 * @returns модуль числа
 */
export default function vecAbs(vec: number[]): number {
   return Math.hypot(...vec);
}