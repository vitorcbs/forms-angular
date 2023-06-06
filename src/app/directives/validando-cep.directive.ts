import { ConsultaCepService } from "./../service/consulta-cep.service";
import { Directive } from "@angular/core";
import {
  AsyncValidator,
  NG_ASYNC_VALIDATORS,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { Observable, map } from "rxjs";

@Directive({
  selector: "[validadorCEP]",
  providers: [
    {
      provide: NG_ASYNC_VALIDATORS,
      useExisting: ValidandoCepDirective,
      multi: true,
    },
  ],
})
export class ValidandoCepDirective implements AsyncValidator {
  constructor(private ConsultaCepService: ConsultaCepService) {}
  
  validate(
    control: AbstractControl<any, any>
  ): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const cep = control.value;

    return this.ConsultaCepService.getConsultaCep(cep).pipe(map(
      (resultado: any) => resultado.erro ? {"validadorCEP": true} : null  //retorna erro caso resultado possua 'erro'
  ))
  }
}
