import MatrixDom from "./MatrixDom";

import "./VectorDom.sass";

export interface IVectorDomConfig {
   title?: string,
   m?: number,
   minM?: number,
   maxM?: number,
   disabled?: boolean,
   data?: number[][],
}

export default class VectorDom extends MatrixDom {
   constructor(config: IVectorDomConfig) {
      super({
         title: config.title,
         m: config.m,
         minM: config.minM,
         maxM: config.maxM,
         disabled: config.disabled,
         data: config.data,
         n: 1,
         minN: 1,
         maxN: 1,
      });

   }

   protected _createRoot() {
      super._createRoot();

      this._root.className += ' matrixDom-isVector';
   }
}