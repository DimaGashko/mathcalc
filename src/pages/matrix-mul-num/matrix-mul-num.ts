import '../_templates/calcPage/calcPage';
import './matrix-mul-num.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import matrixMulNum from '../../calcFunctions/matrixMulNum';
const workspace = document.querySelector('.calc-workspace');

const els = {
   matrixA: workspace.querySelector('.calc__matrixA'),
   matrixB: workspace.querySelector('.calc__matrixB'),
}

console.log('Matrix multiplication');
 
let num = 5;

const matrixA = new MatrixDom({
   title: 'Matrix A',
});
const matrixB = new MatrixDom({
   title: `A * ${num}`,
   disabled: true,
});

els.matrixA.appendChild(matrixA.root);
els.matrixB.appendChild(matrixB.root);

calc();

matrixA.addEvent('change-data', () => {
   calc();
});


matrixA.addEvent('change-dimensions', () => { 
   calc();
});

function calc() { 
   const res = matrixMulNum(matrixA.getData(), num);
   matrixB.setData(res);
}

(<any>window).setNum = (_num: number) => { 
   num = _num;
   matrixB.title = `A * ${num}`;
   calc();
   // input[type=number, min, max]
}