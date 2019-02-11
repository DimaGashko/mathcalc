import '../templates/calcPage/calcPage';
import './matrix-transpose.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import matrixTranspose from '../../calcFunctions/matrixTranspose';

const workspace = document.querySelector('.calc-workspace');

const els = {
   matrixA: workspace.querySelector('.calc__matrixA'),
   matrixT: workspace.querySelector('.calc__matrixT'),
}

console.log('Matrix transpose');
 
const matrixA = new MatrixDom({
   title: 'Matrix A',
});
const matrixT = new MatrixDom({
   title: 'Matrix T',
   disabled: true,
});

els.matrixA.appendChild(matrixA.root);
els.matrixT.appendChild(matrixT.root);

calc();

matrixA.addEvent('change-data', () => {
   calc();
});

matrixA.addEvent('change-dimensions', () => { 
   calc();
});

function calc() { 
   const res = matrixTranspose(matrixA.getData());
   matrixT.setData(res);
}
