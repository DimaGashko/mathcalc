import EventListener from '../EventListener/EventListener';
import * as microTemplate from 'micro-template';

import * as mainTmpl from './templates/mainTmpl.pug';
import * as dataTmpl from './templates/dataTmpl.pug';
import * as controlsTmpl from './templates/controlsTmpl.pug';

import './MatrixDom.sass';

microTemplate.template.variable = 't';

/** Интерфейс параметров, которые можно передать в конструктор MatrixDom */
export interface IMatrixDomConfig {
   title?: string,
   m?: number,
   n?: number,
   minM?: number,
   minN?: number,
   maxM?: number,
   maxN?: number,
   disabled?: boolean,
   data?: number[][],
}

/** Интерфейс используемых элементов */
interface IElements {
   data: HTMLElement,
   controls: HTMLElement,
   title: HTMLElement,
   area: HTMLTextAreaElement,
   viewButton: HTMLElement,
   resetButton: HTMLElement,
   mDimensions: HTMLInputElement,
   nDimensions: HTMLInputElement,
}

/** Возможные типы отображения матрицы */
type ViewType = 'cell' | 'area';

export default class MatrixDom extends EventListener {
   private _title: string = '';
   private _isDisabled: boolean = false;

   private _defaultMatrix: number[][] = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
   ];

   private _defaultM: number = this._defaultMatrix.length;
   private _defaultN: number = this._defaultMatrix[0].length;

   /** 
    * Внутреннее представление матрицы 
    * 
    * Размеры внутреннего представления не связаны с реальными 
    * размерами матрицы (this._m, this._n)
    * 
    * m, n может быть как больше (в этом случае недостающие 
    * элементы будут считаться нулями), так и меньше (остальные элементы из 
    * this._matrix просто не будут использованы (но если m, n увеличится, 
    * то они снова будут видимы))
    */
   private _matrix: number[][];

   /** Количество строк матрицы */
   private _m: number;
      
   /** Количество столбцов матрицы */
   private _n: number;

   private _minM: number = 1;
   private _minN: number = 1;
   private _maxM: number = 25;
   private _maxN: number = 25;

   /** Тип отображения матрицы (в виде отдельных ячеек, или текстом) */
   private _viewType: ViewType = 'cell';

   /** HTML-контейнер компонента */
   private _root: HTMLElement = null;

   /** HTML-элементы компонента */
   private els: IElements = {
      data: null,
      controls: null,
      title: null,
      area: null,
      viewButton: null,
      resetButton: null,
      mDimensions: null,
      nDimensions: null,
   }

   // Базовый шаблон
   private mainTmpl = mainTmpl;

   // Шаблон данных (непосредственно матрицы)
   private dataTmpl = dataTmpl;

   // Шаблон панели управления
   private controlsTmpl = controlsTmpl;

   constructor(config: IMatrixDomConfig = {}) {
      super();

      this.init(config);
   }

   private init(config: IMatrixDomConfig): void {
      this._createRoot();
      this._initEvents();

      const customData = 'data' in config
         && config.data.length > 0
         && config.data[0].length > 0;
      
      // Установка данных обязана быть перед изменением m, n и их лимитов
      if (customData) this._defaultMatrix = config.data;

      if ('m' in config) this._defaultM = config.m;
      else if (customData) this._defaultM = config.data.length;

      if ('n' in config) this._defaultN = config.n;
      else if (customData) this._defaultN = config.data[0].length;

      if ('minM' in config) this._setMinM(config.minM);
      if ('minN' in config) this._setMinN(config.minN);
      if ('maxM' in config) this._setMaxM(config.maxM);
      if ('maxN' in config) this._setMaxN(config.maxN);

      if ('title' in config) this._title = config.title;
      if ('disabled' in config) this._isDisabled = config.disabled;

      this.resetData();
      this.render();
   }

   private _initEvents() {
      this._root.addEventListener('click', (event) => {
         const targ = <HTMLElement>event.target;

         if (targ.classList.contains('matrixDom__view')) {
            this.onView();

         } else if (targ.classList.contains('matrixDom__reset')) {
            if (this._isDisabled) return;
            this.onReset();

         }
      });

      this._root.addEventListener('keyup', (event) => {
         if (this._isDisabled) return;
         const targ = <HTMLElement>event.target;

         if (targ.classList.contains('matrixCell__input')) {
            this.onCellChange(<HTMLInputElement>targ);
         }

         if (targ.classList.contains('matrixDom__area')) {
            this.onAreaType(event);
         }
      });

      this._root.addEventListener('change', (event) => {
         if (this._isDisabled) return;
         const targ = <HTMLElement>event.target;

         if (targ.classList.contains('matrixDom__dimensionsControl')) {
            this.onDimensionsChange();

         } else if (targ.classList.contains('matrixCell__input')) {
            this.onCellChange(<HTMLInputElement>targ);
         }
      });

      this._root.addEventListener('focus', (event) => {
         const targ = <HTMLElement>event.target;

         const isInputForSelect = targ.classList.contains('matrixCell__input')
            || targ.classList.contains('matrixDom__dimensionsControl');

         if (isInputForSelect) { 
            (<HTMLInputElement>targ).select();
         }

      }, true);
   }

   private onCellChange(cellInput: HTMLInputElement) {
      const cell = cellInput.closest('.matrixCell');
      if (!cell) return

      const i = +cell.getAttribute('data-cell-i');
      const j = +cell.getAttribute('data-cell-j');
      const val = +cellInput.value;

      if (isNaN(i) || isNaN(j)) return;

      this.set(i, j, val);
   }

   /**
    * Форматирует число для вывода
    * @param item элемент матрицы / любое число
    */
   private formatItem(item: number): string { 
      item = Math.round(item * 1e4) / 1e4;

      return item + '';
   }

   /**
    * Возвращает отформатированный для вывода элемент
    */
   private getFormated(i: number, j: number): string { 
      return this.formatItem(this.get(i, j)) + '';
   }

   private onAreaType(event: KeyboardEvent) {
      if (this.viewType !== 'area') return;

      const val = this.els.area.value.trim();
      if (!val.length) return;

      const newData = val.split('\n') 
         .filter(row => row.trim().length > 0)
         .map((row) => {
            return row
               .replace(/^[\D]+|[\D]+$/g, '') // trim к цифрам на краях
               .replace(/[\s,]+/g, ',').split(',')
               .map((item) => parseFloat(item));
         });

      this._matrix = [];

      this._setData(newData);
      this.renderControls();
   }

   private onDimensionsChange() {
      const m = +this.els.mDimensions.value;
      const n = +this.els.nDimensions.value;

      this._setDimensions(m, n);
      this.renderData();
   }

   private onView() {
      this.toggleViewType();
   }

   private onReset() {
      this.resetData();
   }

   private render(): void {
      this._root.innerHTML = microTemplate.template(this.mainTmpl, this);

      this.els.data = this.root.querySelector('.matrixDom__data');
      this.els.controls = this.root.querySelector('.matrixDom__controls');
      this.els.title = this.root.querySelector('.matrixDom__title');

      this.renderData();
      this.renderControls();
   }

   private renderData() {
      if (!this.els.data) return;

      this.els.data.innerHTML = microTemplate
         .template(this.dataTmpl, this);

      this.els.area = this.root.querySelector('.matrixDom__area');
      
      this.correctAreaSize();
   }

   private renderControls() {
      if (!this.els.controls) return;

      this.els.controls.innerHTML = microTemplate
         .template(this.controlsTmpl, this);

      this.els.viewButton = this.root.querySelector('.matrixDom__view');
      this.els.resetButton = this.root.querySelector('.matrixDom__reset');
      this.els.mDimensions = this.root.querySelector('.matrixDom__mDimensions');
      this.els.nDimensions = this.root.querySelector('.matrixDom__nDimensions');
   }

   private correctAreaSize() {
      if (this.viewType !== 'area') return;

      this.els.area.style.width = this.els.area.scrollWidth + 'px';
      this.els.area.style.height = this.els.area.scrollHeight + 'px';
   }

   private _createRoot() {
      this._root = document.createElement('div');
   }

   private _getAreaText(): string {
      return this.getData().map((row) => {
         return row
            .map(item => this.formatItem(item))
            .join(' ');
      }).join('\n');
   }

   /**
    * Возвращает значение i строки j столбца
    * 
    * Всегда возвращает значение. Если на переданных координатах ничего нет 
    * возвращает 0 (даже если i, j > m, n)
    * 
    * @param i номер строки
    * @param j номер столбца
    */
   private get(i: number, j: number): number {
      const row = this._matrix[i];
      if (!row) return 0;

      return row[j] || 0;
   }

   /**
    * Устанавливает значение в матрицу (устанавливает при любых значения i, j)
    * @param i номер строки
    * @param j номер столбца 
    * @param val значение
    */
   private set(i: number, j: number, val: number) {
      if (!this._matrix[i]) {
         this._matrix[i] = [];
      }

      this._matrix[i][j] = (!isNaN(val)) ? val : 0;

      this.emit('change-data');
   }

   public toggleViewType() {
      this.viewType = (this.viewType === 'cell')
         ? 'area' : 'cell';

      this.render();
   }

   public resetData() {
      this._setDimensions(this._defaultM, this._defaultN);

      this._matrix = [];

      this._defaultMatrix.forEach((row, i) => { 
         row.forEach((item, j) => { 
            this.set(i, j, item);
         });
      });

      this.renderData();
   }

   public get root(): HTMLElement {
      return this._root;
   }

   public getData(): number[][] {
      const res: number[][] = new Array(this._m);

      for (let i = 0; i < this._m; i++) {
         res[i] = new Array(this._n);

         for (let j = 0; j < this._n; j++) {
            res[i][j] = this.get(i, j);
         }
      }

      return res;
   }

   public _setData(data: number[][]) {
      if (data.length === 0 || data[0].length === 0) {
         this.resetData();
      }

      const m = data.length;

      // Берем максимальное количество столбцов (если в других меньше, 
      // недостающие элементы позже(в this.set()) станут нулями)
      const n = data.map(row => row.length).sort((a, b) => b - a)[0];

      this._setDimensions(m, n);

      data.forEach((row, i) => {
         row.forEach((item, j) => {
            if (i > this._m - 1 || j > this._n - 1) return;

            this.set(i, j, item);
         });
      });

      this.emit('change-data');
   }

   public setData(data: number[][]) {
      this._setData(data);

      this.renderData();
      this.renderControls();
   }

   private _setDimensions(m: number, n: number) {
      m = m ^ 0;
      n = n ^ 0;

      if (m > this._maxM) m = this._maxM;
      if (m < this._minM) m = this._minM;

      if (n > this._maxN) n = this._maxN;
      if (n < this._minN) n = this._minN;

      this._m = m;
      this._n = n;

      if (this.els.nDimensions && this.els.mDimensions) {
         this.els.mDimensions.value = this._m + '';
         this.els.nDimensions.value = this._n + '';
      }

      this.emit('change-dimensions');
   }

   public get m(): number {
      return this._m;
   }

   public set m(val: number) {
      if (val === this._m) return;

      this._setDimensions(val, this._n);
      this.render();
   }

   public get n(): number {
      return this._n;
   }

   public set n(val: number) {
      if (val === this._n) return;

      this._setDimensions(this._m, val);
      this.render();
   }

   public get title(): string {
      return this._title;
   }

   public set title(val: string) {
      if (this._title === val) return;

      this._title = val;

      if (!this.els.title) return;

      this.els.title.innerHTML = this._title;

      this.emit('change-title');
   }

   public get viewType(): ViewType {
      return this._viewType;
   }

   public set viewType(val: ViewType) {
      if (this._viewType === val) return;

      this._viewType = val;

      this.render();
   }

   public get minM(): number { 
      return this._minM;
   }

   public set minM(val: number) {
      this._setMinM(val);
      this.render();
   }

   private _setMinM(val: number) {
      if (val < 1) val = 1;
      this._minM = val;

      if (this._m > this._minM) {
         this._m = this._minM;
      }
   }

   public get minN(): number { 
      return this._minN;
   }

   public set minN(val: number) {
      this._setMinN(val);
      this.render();
   }

   private _setMinN(val: number) {
      if (val < 1) val = 1;
      this._minN = val;

      if (this._n < this._minN) {
         this._n = this._minN;
      }
   }

   public get maxM(): number { 
      return this._maxM;
   }

   public set maxM(val: number) {
      this._setMaxM(val);
      this.render();
   }

   private _setMaxM(val: number) {
      if (val > 500) val = 500;
      this._maxM = val;

      if (this._m > this._maxM) {
         this._m = this._maxM;
      }
   }

   public get maxN(): number { 
      return this._maxN;
   }

   public set maxN(val: number) {
      this._setMaxN(val);
      this.render();
   }

   private _setMaxN(val: number) {
      if (val > 500) val = 500;
      this._maxN = val;
      
      if (this._n > this._maxN) {
         this._n = this._maxN;
      }
   }

   public get disabled(): boolean {
      return this._isDisabled;
   }

   public set disabled(val: boolean) {
      if (val === this._isDisabled) return;

      this._isDisabled = val;
      this.render();
   }

}