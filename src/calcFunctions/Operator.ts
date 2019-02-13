export interface Operator { 
   (a: number, b: number): number
   symbol: string
}

export const plusOperator: Operator = (a: number, b: number) => { 
   return a + b;
}

export const minusOperator: Operator = (a: number, b: number) => { 
   return a - b; 
}

export const mulOperator: Operator = (a: number, b: number) => { 
   return a * b;
}

export const divOperator: Operator = (a: number, b: number) => { 
   if (b === 0) return NaN;
   return a / b;
}

plusOperator.symbol = '+';
minusOperator.symbol = '-';
mulOperator.symbol = '*';
divOperator.symbol = '/';

export const baseOperators: {[type: string]: Operator} = {
   '+': plusOperator,
   '-': minusOperator,
   '*': mulOperator,
   '/': divOperator,
}