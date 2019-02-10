// Type definitions for micro-template
// Project: https://github.com/cho45/micro-template.js
// Definitions by: Dmitry Gashko <https://github.com/DimaGashko>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped

declare namespace MicroTemplate {
   interface MicroTemplateStatic {
      /**
       * JavaScript templates
       * 
       * @param idOrSource if it matches ` /^[\w\-]+$/ `, it's treated as id 
       * of template. In this case, use `document.getElementById(id).innerHTML` 
       * to get a source. Otherwise, the first argument is treated as a source
       * 
       * @param data template data. If it **not** supplied returns `TmplFunc`, 
       * otherwise *result of template*
       */
      template: TemplateStatic,


      extended: ExtendedStatic
   }

   interface TemplateStatic {
      (idOrSource: string, data: any): string;
      (idOrSource: string): TmplFunc;

      /**
       * By default, micro-template uses document.getElementById(id).innerHTML 
       * to get template source from id. To override this behavior, you can set 
       * function to template.get()
       * 
       * ```JavaScript
       * template.get = (id) => require('fs')
       *    .readFileSync(`${id}.tmpl`, 'utf-8');
       * ```
       * 
       * @param id template id
       * 
       */
      get: CustomGetFunction,

      /**
       * By default, micro-template uses syntax to expand data variables 
       * This behavior is almost convenience, but if you want to expressly 
       * fast template function, you can do this by set template.variable
       * 
       * ```JavaScript
       * template.variable = 'tmpl';
       * var func = template('aaa <% tmpl.foo %> bbb');
       * var result = func({ foo : 'foo' });
       * ```
       */
      variable: string;
   }

   interface CustomGetFunction { 
      (id: string): string;
   }

   interface ExtendedStatic {
      (id: string, data: any): any;
   }

   interface TmplFunc {
      (data: any): string;
   }

}

declare const microTemplate: MicroTemplate.MicroTemplateStatic

declare module "micro-template" {
   export = microTemplate
}