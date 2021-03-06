import '../_templates/calcPage/calcPage';
import './vec-abs.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import vecAbs from '../../calcFunctions/vecAbs';

const workspace = document.querySelector('.calc-workspace');

const els = {
   vecA: workspace.querySelector('.calc__vecA'),
   res: workspace.querySelector('.calc__resVal'),
}

const vecA = new MatrixDom({
   title: 'Vector A',
   maxM: 1,
});

els.vecA.appendChild(vecA.root);

calc();

vecA.addEvent('change-data', () => {
   calc(); 
});

vecA.addEvent('change-dimensions', () => {
   calc();
});

function calc() {
   const res = vecAbs(vecA.getData()[0]);
   els.res.innerHTML = res.toFixed(3);   
}