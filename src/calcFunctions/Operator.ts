export interface Operator<T> { 
   (a: T, b: T): T
}

export const plusOperator: Operator<number> = (a: number, b: number) => { 
   return a + b;
}

export const minusOperator: Operator<number>  = (a: number, b: number) => { 
   return a - b;
}

export const mulOperator: Operator<number> = (a: number, b: number) => { 
   return a * b;
}

export const divOperator: Operator<number> = (a: number, b: number) => { 
   return a / b;
}
