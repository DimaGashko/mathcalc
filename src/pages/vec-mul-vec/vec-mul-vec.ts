import '../_templates/calcPage/calcPage';
import './vec-mul-vec.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import vecPlusVec from '../../calcFunctions/vecPlusVec';
import vecMulVec from '../../calcFunctions/vecMulVec';
const workspace = document.querySelector('.calc-workspace');

const els = {
   vecA: workspace.querySelector('.calc__vecA'),
   vecB: workspace.querySelector('.calc__vecB'),
   res: workspace.querySelector('.calc__resVal'),
}

const vecA = new MatrixDom({
   title: 'Vector A',
   maxM: 1,
});
const vecB = new MatrixDom({
   title: 'Vector B',
   maxM: 1,
});

els.vecA.appendChild(vecA.root);
els.vecB.appendChild(vecB.root);

vecB.n = vecA.n;
calc();

vecA.addEvent('change-data', () => {
   calc();
});

vecB.addEvent('change-data', () => {
   calc();
});

vecA.addEvent('change-dimensions', () => {
   vecB.n = vecA.n;
   calc();
});

vecB.addEvent('change-dimensions', () => {
   vecA.n = vecB.n;
   calc();
});

function calc() {
   const res = vecMulVec(vecA.getData()[0], vecB.getData()[0]);
   els.res.innerHTML = res.toFixed(3) + '';
}