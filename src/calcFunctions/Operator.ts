export interface Operator { 
   (a: number, b: number): number
}

export const plusOperator: Operator= (a: number, b: number) => { 
   return a + b;
}

export const minusOperator: Operator = (a: number, b: number) => { 
   return a - b;
}

export const mulOperator: Operator = (a: number, b: number) => { 
   return a * b;
}

export const divOperator: Operator = (a: number, b: number) => { 
   return a / b;
}
