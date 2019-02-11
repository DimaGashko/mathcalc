import '../templates/calcPage/calcPage';
import './matrix-plus-matrix.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import matrixPlusMatrix from '../../calcFunctions/matrixPlusMatrix';
const workspace = document.querySelector('.calc-workspace');

const els = {
   matrixA: workspace.querySelector('.calc__matrixA'),
   matrixB: workspace.querySelector('.calc__matrixB'),
   matrixC: workspace.querySelector('.calc__matrixC'),
}

console.log('Matrix addition');

const matrixA = new MatrixDom({
   title: 'Matrix A',
});
const matrixB = new MatrixDom({
   title: 'Matrix B',
});
const matrixC = new MatrixDom({
   title: 'A + B',
   disabled: true,
});

els.matrixA.appendChild(matrixA.root);
els.matrixB.appendChild(matrixB.root);
els.matrixC.appendChild(matrixC.root);

matrixB.n = matrixA.n;
matrixB.m = matrixA.m;
calc();

matrixA.addEvent('change-data', () => {
   calc();
});

matrixB.addEvent('change-data', () => {
   calc();
});

matrixA.addEvent('change-dimensions', () => {
   matrixB.n = matrixA.n;
   matrixB.m = matrixA.m;
   calc();
});

matrixB.addEvent('change-dimensions', () => {
   matrixA.n = matrixB.n;
   matrixA.m = matrixB.m;
   calc();
});

function calc() {
   const res = matrixPlusMatrix(matrixA.getData(), matrixB.getData());
   matrixC.setData(res);
}