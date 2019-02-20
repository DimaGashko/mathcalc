import MatrixDom from "./MatrixDom";

export interface IVectorDomConfig {
   title?: string,
   n?: number,
   minN?: number,
   maxN?: number,
   disabled?: boolean,
   data?: number[][],
}

export default class VectorDom extends MatrixDom {
   constructor(config: IVectorDomConfig) {
      super({
         title: config.title,
         n: config.n,
         minN: config.minN,
         maxN: config.maxN,
         disabled: config.disabled,
         data: config.data,
         m: 1,
         minM: 1,
         maxM: 1,
      });

   }
}