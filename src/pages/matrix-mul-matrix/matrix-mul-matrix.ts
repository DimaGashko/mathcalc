import '../templates/calcPage/calcPage';
import './matrix-mul-matrix.sass';
import { throttle } from 'throttle-debounce';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import matrixMulMatrix from '../../calcFunctions/matrixMulMatrix';

const workspace = document.querySelector('.calc-workspace');

const els = {
   matrixA: workspace.querySelector('.calc__matrixA'),
   matrixB: workspace.querySelector('.calc__matrixB'),
   matrixC: workspace.querySelector('.calc__matrixC'),
}

const throttleCalc = throttle(2000, calc);

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

throttleCalc();

matrixA.addEvent('change-data', () => {
   throttleCalc();
});

matrixB.addEvent('change-data', () => {
   throttleCalc();
});

matrixA.addEvent('change-dimensions', () => { 
   matrixB.m = matrixA.n;
   throttleCalc();
});

matrixB.addEvent('change-dimensions', () => { 
   matrixA.n = matrixB.m;
   throttleCalc();
});

function calc() { 
   const res = matrixMulMatrix(matrixA.getData(), matrixB.getData());
   matrixC.setData(res);
}