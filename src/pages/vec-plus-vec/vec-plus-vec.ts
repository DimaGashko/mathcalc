import '../_templates/calcPage/calcPage';
import './vec-plus-vec.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import vecPlusVec from '../../calcFunctions/vecPlusVec';
const workspace = document.querySelector('.calc-workspace');

const els = {
   vecA: workspace.querySelector('.calc__vecA'),
   vecB: workspace.querySelector('.calc__vecB'),
   vecC: workspace.querySelector('.calc__vecC'),
}

const vecA = new MatrixDom({
   title: 'Vector A',
   maxM: 1,
});
const vecB = new MatrixDom({
   title: 'Vector B',
   maxM: 1,
});
const vecC = new MatrixDom({
   title: 'A + B',
   disabled: true,
   maxM: 1,
});

els.vecA.appendChild(vecA.root);
els.vecB.appendChild(vecB.root);
els.vecC.appendChild(vecC.root);

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
   const res = vecPlusVec(vecA.getData()[0], vecB.getData()[0]);
   vecC.setData([res]);
}