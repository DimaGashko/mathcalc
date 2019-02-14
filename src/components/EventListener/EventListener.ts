import { throttle } from "throttle-debounce";

/**
 * @class
 * 
 * Класс для работы с событиями
 * 
 * Использование:
 * 1. Можно задавать явно:
 * 
 * ```javascript
 * var listener = new EventListener();
 * listener.addEvent('eventName', () => {
 *    console.log('ok');
 * })
 * listener.emit('eventName');
 * ```
 * 
 * 2. Также можно наследовать от Events в своих классах:
 * 
 *```javascript
 * class A extends EventListener {...}
 *```
 *  
 * В таком случае класс А будет обретать все возможности Events
 * 
 * ```javascript
 * var a = new A();
 * a.addEvent('eventName', () => {
 *    console.log('ok');
 * })
 * a.emit('eventName');
 * ```
 * 
*/
export default class EventListener {
   // Хранит все вызываемые функции при наступлении событий
   // Все они хранятся в свойстве с названием события
   // Функции хранятся в массиве
   // Например: {load: [f1, f2, f3]}
   private handlers: { [key: string]: Function[] } = {}

   constructor() {

   }

   /**
    * Добавляет событие
    * 
    * @param {string} type тип события
    * @param {function} handler функция, которую нужно выполнить 
    * при наступлении события
    */
   addEvent(type: string, handler: Function) {
      if (!(type in this.handlers)) this.handlers[type] = [];

      this.handlers[type].push(handler);
   }

   /**
    * Удаляет событие
    * 
    * @param {string} type тип события
    * @param {function} handler функция, которую нужно удалить 
    * (должна быть непосредственно той функций, которую передавали в addEvent)
    */
   removeEvent(type: string, handler: Function) {
      this.handlers[type] = this.handlers[type].filter((func) => {
         return func !== handler;
      });
   }

   /**
    * Вызывает событие
    * 
    * @param {string} type тип события
    * 
    * Все параметры после первого будут переданы во все handler-ы
    */
   emit(type: string, ...parameters: any) {
      if (!this.handlers[type]) return;
      let handlers = this.handlers[type];

      for (let i = handlers.length - 1; i >= 0; i--) {
         handlers[i](...parameters);
      }

   }

   throttleEmit = throttle(50, this.emit);
}