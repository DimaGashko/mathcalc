import '../_global/global';
import './matrix-mul-matrix.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import matrixMulMatrix from '../../calcFunctions/matrixMulMatrix';

const root = document.querySelector('.app');

console.log('Matrix multiplication');

const matrixA = new MatrixDom();
const matrixB = new MatrixDom();
const matrixC = new MatrixDom({
   disabled: true,
});

root.appendChild(matrixA.root);
root.appendChild(matrixB.root);
root.appendChild(matrixC.root);

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
