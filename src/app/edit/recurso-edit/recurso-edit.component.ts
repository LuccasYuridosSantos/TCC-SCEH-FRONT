import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoHospitalar } from 'src/app/model/RecursoHospitalar';
import { RecursoRequest } from 'src/app/model/RecursoRequest';
import { AlertasService } from 'src/app/service/alertas.service';
import { RecursoService } from 'src/app/service/recurso.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-recurso-edit',
  templateUrl: './recurso-edit.component.html',
  styleUrls: ['./recurso-edit.component.css']
})
export class RecursoEditComponent implements OnInit {

  recurso: RecursoHospitalar = new RecursoHospitalar()
  recursoRequest: RecursoRequest = new RecursoRequest()
  idRecurso: number

  constructor(
    private router: Router,
    private recursoService: RecursoService,
    private route: ActivatedRoute,
    private alertasService: AlertasService
    
    ) { }

  ngOnInit() {
    if(environment.token == '' || this.validarPermissao()){
      this.router.navigate(['/inicio'])
    }
    this.idRecurso = this.route.snapshot.params['id']
    this.buscarRecursoPorId(this.idRecurso)
  }

  validarPermissao(){
    if(environment.permissao == 'ADM' || environment.permissao == 'ROOT'){
      return false
    }else{
      return true
    }
  }


  atualizar(){


    if (this.recursoRequest.dataFabricacao == null || this.recursoRequest.dataValidade == null || this.recursoRequest.fabricante == null
      || this.recursoRequest.lote == null || this.recursoRequest.marca == null || this.recursoRequest.quantidade == null || this.recursoRequest.nome == null) {

      this.alertasService.showAlertInfo('Preencha todos os campos!')

    } else if (this.dataDeValidadeEInvalida(this.recursoRequest.dataFabricacao, this.recursoRequest.dataValidade)) {

      this.alertasService.showAlertInfo('Data de validade não pode ser menor ou igual a de fabricação!')

    }else if(this.recursoRequest.quantidade <= 0){
      this.alertasService.showAlertInfo('Quantidade invalida, quantidade precisa ser maior do que zero')
    } else {
      this.recursoService.putRecurso(this.recursoRequest).subscribe((resp: RecursoRequest) => {
        this.recursoRequest = resp
        this.alertasService.showAlertSuccess('Recurso Atualizado com Sucesso')
        this.router.navigate(['/inicio'])
      }, erro => {
        if (erro.status == 500) {
          this.alertasService.showAlertDanger('Ocorreu um erro, tente novamente mais tarde')
        }
        if (erro.status == 400) {
          this.alertasService.showAlertInfo('Dados invalidos')
        }
      })

    }

  }

  buscarRecursoPorId(id: number){
    this.recursoService.getByIdRecurso(id).subscribe((resp: RecursoHospitalar)=>{
      this.recurso = resp
      this.converteParaRecursoRequest(resp)
    })
  }

  converteParaRecursoRequest(recurso: RecursoHospitalar){
    this.recursoRequest.cnpj = environment.cnpj
    this.recursoRequest.codigoFuncionario = recurso.funcionario.codigoFuncionario
    this.recursoRequest.codigoRecurso = this.idRecurso
    this.recursoRequest.dataFabricacao = recurso.dataFabricacao
    this.recursoRequest.dataValidade = recurso.dataValidade
    this.recursoRequest.quantidade = recurso.quantidade
    this.recursoRequest.nome = recurso.nome
    this.recursoRequest.descricao = recurso.descricao
    this.recursoRequest.fabricante = recurso.fabricante
    this.recursoRequest.lote = recurso.lote
    this.recursoRequest.marca = recurso.marca
  }

  dataDeValidadeEInvalida(dataFabricacao: string, dataValidade: string) {
    const dateOne = new Date(dataFabricacao)
    const dateTwo = new Date(dataValidade)

    if (dateOne >= dateTwo) {
      return true
    } else {
      return false
    }
  }
}
