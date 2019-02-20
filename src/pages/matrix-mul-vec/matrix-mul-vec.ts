import '../_templates/calcPage/calcPage';
import './matrix-mul-vec.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import VectorDom from '../../components/MatrixDom/VectorDom';
import matrixMulVec from '../../calcFunctions/matrixMulVec';

const workspace = document.querySelector('.calc-workspace');

const els = {
   matrixA: workspace.querySelector('.calc__matrixA'),
   matrixB: workspace.querySelector('.calc__matrixB'),
   matrixC: workspace.querySelector('.calc__matrixC'),
}
 
const matrixA = new MatrixDom({
   title: 'Matrix A',
});
const vectorB = new VectorDom({
   title: 'Vector B',
});
const matrixC = new MatrixDom({
   title: 'A * B',
   disabled: true,
});

els.matrixA.appendChild(matrixA.root);
els.matrixB.appendChild(vectorB.root);
els.matrixC.appendChild(matrixC.root);

vectorB.m = matrixA.n;
calc();

matrixA.addEvent('change-data', () => {
   calc();
});

vectorB.addEvent('change-data', () => {
   calc();
});

matrixA.addEvent('change-dimensions', () => { 
   vectorB.m = matrixA.n;
   calc();
});

vectorB.addEvent('change-dimensions', () => { 
   matrixA.n = vectorB.m;
   calc();
});

function calc() { 
   const vec = new Array(vectorB.m);

   vectorB.getData().forEach((row, i) => { 
      vec[i] = row[0];
   })

   const res = matrixMulVec(matrixA.getData(), vec);
   matrixC.setData(res);
}