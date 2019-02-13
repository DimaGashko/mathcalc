import '../_templates/calcPage/calcPage';
import './matrix-mul-num.sass';

import MatrixDom from '../../components/MatrixDom/MatrixDom';
import matrixMulNum from '../../calcFunctions/matrixMulNum';
import { Operator, baseOperators, mulOperator } from '../../calcFunctions/Operator';
const workspace = document.querySelector('.calc-workspace');

const els = {
   matrixA: workspace.querySelector('.calc__matrixA'),
   matrixB: workspace.querySelector('.calc__matrixB'),

   selectOperator: <HTMLSelectElement>workspace
      .querySelector('.selectOperator'),
   
   selectNumber: <HTMLInputElement>workspace
      .querySelector('.selectNumber'),
}

const minNum = +els.selectNumber.min || 1e6;
const maxNum = +els.selectNumber.max || 1e6;

const matrixA = new MatrixDom({
   title: 'Matrix A',
});
const matrixB = new MatrixDom({
   title: getTitle(),
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

els.selectNumber.addEventListener('change', () => {
   matrixB.title = getTitle();
   calc();
});

els.selectNumber.addEventListener('keyup', (event) => {
   matrixB.title = getTitle();
   calc();

   if (event.keyCode === 13) {
      els.selectNumber.value = getNum() + '';
   }
});

els.selectNumber.addEventListener('blur', () => {
   els.selectNumber.value = getNum() + '';
});

els.selectOperator.addEventListener('change', () => {
   matrixB.title = getTitle();
   calc();
});

function calc() { 
   const res = matrixMulNum(matrixA.getData(), getNum(), getOperator());
   matrixB.setData(res);
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