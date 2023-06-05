import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[MaiorIdadeValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MaiorIdadeDirective,
    multi: true
  }]
})
export class MaiorIdadeDirective {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
      const dataNascimento = control.value; //pega a data
      const anoNascimento = new Date(dataNascimento).getFullYear() //pega o ano
      const anoNascimentoMais18 = anoNascimento + 18
      const anoAtual = new Date().getFullYear()
      const ehMaior = anoNascimentoMais18 <= anoAtual

      return ehMaior ? null : {'MaiorIdadeValidator': true}
  }
}