if (!Element.prototype.matches) {
   Element.prototype.matches = (<any>Element.prototype).msMatchesSelector ||
      Element.prototype.webkitMatchesSelector;
}

if (!Element.prototype.closest) {
   Element.prototype.closest = function (s: string) {
      var el: Element = this;

      do {
         if (el.matches(s)) return el;
         el = <Element>(el.parentElement || el.parentNode);
      } while (el !== null && el.nodeType === 1);
      return null;
   };
}