import '../_templates/calcPage/calcPage';
import './vec-mul-num.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import { Operator, baseOperators, mulOperator } from '../../calcFunctions/Operator';
import vecMulNum from '../../calcFunctions/vecMulNum';
const workspace = document.querySelector('.calc-workspace');

const els = {
   vecA: workspace.querySelector('.calc__vecA'),
   vecB: workspace.querySelector('.calc__vecB'),

   selectOperator: <HTMLSelectElement>workspace
      .querySelector('.selectOperator'),
   
   selectNumber: <HTMLInputElement>workspace
      .querySelector('.selectNumber'),
}

const minNum = +els.selectNumber.min || 1e6;
const maxNum = +els.selectNumber.max || 1e6;

const vecA = new MatrixDom({
   title: 'vec A',
   maxM: 1,
});
const vecB = new MatrixDom({
   title: getTitle(),
   disabled: true,
   maxM: 1,
});

els.vecA.appendChild(vecA.root);
els.vecB.appendChild(vecB.root);

calc();

vecA.addEvent('change-data', () => {
   calc();
});


vecA.addEvent('change-dimensions', () => { 
   calc();
});

els.selectNumber.addEventListener('change', () => {
   vecB.title = getTitle();
   calc();
});

els.selectNumber.addEventListener('keyup', (event) => {
   vecB.title = getTitle();
   calc();

   if (event.keyCode === 13) {
      els.selectNumber.value = getNum() + '';
   }
});

els.selectNumber.addEventListener('blur', () => {
   els.selectNumber.value = getNum() + '';
});

els.selectOperator.addEventListener('change', () => {
   vecB.title = getTitle();
   calc();
});

function calc() { 
   const res = vecMulNum(vecA.getData()[0], getNum(), getOperator());
   vecB.setData([res]);
}

function getTitle() {
   let num = getNum();
   let strNum = (num > 0) ? num + '' : `(${num})`;

   return `A ${getOperator().symbol} ${strNum}`;
}
 
function getNum(): number {
   let num = +els.selectNumber.value || 0;

   if (num < minNum) num = minNum;
   else if (num > maxNum) num = maxNum;

   return num;
}

function getOperator(): Operator {
   const operatorStr = els.selectOperator.value;
   let operator = mulOperator;

   if (operatorStr in baseOperators) {
      operator = baseOperators[operatorStr];
   }

   return operator;
}