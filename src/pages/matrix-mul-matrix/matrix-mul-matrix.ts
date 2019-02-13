import '../_templates/calcPage/calcPage';
import './matrix-mul-matrix.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import matrixMulMatrix from '../../calcFunctions/matrixMulMatrix';
const workspace = document.querySelector('.calc-workspace');

const els = {
   matrixA: workspace.querySelector('.calc__matrixA'),
   matrixB: workspace.querySelector('.calc__matrixB'),
   matrixC: workspace.querySelector('.calc__matrixC'),
}
 
const matrixA = new MatrixDom({
   title: 'Matrix A',
});
const matrixB = new MatrixDom({
   title: 'Matrix B',
});
const matrixC = new MatrixDom({
   title: 'A * B',
   disabled: true,
});

els.matrixA.appendChild(matrixA.root);
els.matrixB.appendChild(matrixB.root);
els.matrixC.appendChild(matrixC.root);

matrixB.m = matrixA.n;
calc();

matrixA.addEvent('change-data', () => {
   calc();
});

matrixB.addEvent('change-data', () => {
   calc();
});

matrixA.addEvent('change-dimensions', () => { 
   matrixB.m = matrixA.n;
   calc();
});

matrixB.addEvent('change-dimensions', () => { 
   matrixA.n = matrixB.m;
   calc();
});

function calc() { 
   const res = matrixMulMatrix(matrixA.getData(), matrixB.getData());
   matrixC.setData(res);
}