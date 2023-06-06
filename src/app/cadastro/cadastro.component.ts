import { Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ConsultaCepService } from "../service/consulta-cep.service";

@Component({
  selector: "app-cadastro",
  templateUrl: "./cadastro.component.html",
  styleUrls: ["./cadastro.component.css"],
})
export class CadastroComponent implements OnInit {
  constructor(private router: Router, private serviceCEP: ConsultaCepService) {}

  ngOnInit(): void {}

  consultaCEP(event: any, formulario: NgForm) {
    const cep = event.target.value;
    if( cep !== '') {
      this.serviceCEP.getConsultaCep(cep).subscribe((resultado) => {
        console.log(resultado);
        this.populandoEndereco(resultado, formulario)
      });
    }
    return 
  }

  populandoEndereco(dados:any, form: NgForm) {
    form.form.patchValue({ //recebe os valores do formulario e preenche os campos
      endereco: dados.logradouro,
      complemento: dados.complemento,
      bairro: dados.bairro,
      cidade: dados.localidade,
      estado: dados.uf
    })
  }

  cadastrar(form: NgForm) {
    if (form.valid == true) {
      this.router.navigate(["sucesso"]);
    } else {
      alert("Formulario invalido");
    }
    console.log(form.controls);
  }
}
