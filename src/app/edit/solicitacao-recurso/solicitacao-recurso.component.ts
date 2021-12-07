import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoHospitalar } from 'src/app/model/RecursoHospitalar';
import { RecursoRequest } from 'src/app/model/RecursoRequest';
import { AlertasService } from 'src/app/service/alertas.service';
import { RecursoService } from 'src/app/service/recurso.service';
import { SolicitacaoService } from 'src/app/service/solicitacao.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-solicitacao-recurso',
  templateUrl: './solicitacao-recurso.component.html',
  styleUrls: ['./solicitacao-recurso.component.css']
})
export class SolicitacaoRecursoComponent implements OnInit {

  solicitacao: RecursoHospitalar = new RecursoHospitalar()
  recurso: RecursoHospitalar = new RecursoHospitalar()
  recursoRequest: RecursoRequest = new RecursoRequest()
  idRecurso: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private solicitacaoService: SolicitacaoService,
    private recursoService: RecursoService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {

    if (environment.token == '' || environment.permissao != 'ADM') {
      this.router.navigate(['/inicio'])
    }

    this.idRecurso = this.route.snapshot.params['id']
    this.buscarSolicitacaoPorId(this.idRecurso)
  }

  cadastrarRecurso() {

    this.recursoRequest = this.converteRecursoParaRequest(this.solicitacao)

    if (this.recursoRequest.dataValidade == null || this.recursoRequest.dataFabricacao == null
      || this.recursoRequest.quantidade == null || this.recursoRequest.marca == null
      || this.recursoRequest.fabricante == null || this.recursoRequest.lote == null || this.recursoRequest.descricao == null) {
      this.alertasService.showAlertInfo('Preeencha todos os campos')
    } else if (this.recurso.quantidade <= 0) {
      this.alertasService.showAlertInfo('Quantidade invalida, quantidade precisa ser maior do que zero')
    }else if(this.dataDeValidadeEInvalida(this.recursoRequest.dataFabricacao, this.recursoRequest.dataValidade)) {
      this.alertasService.showAlertInfo('Data de validade não pode ser menor ou igual a de fabricação!')
    }else{
      this.recursoService.putRecurso(this.recursoRequest).subscribe((resp: RecursoRequest) => {
        this.recursoRequest = resp
        this.alertasService.showAlertSuccess('Cadastrado Recurso com Sucesso!')
        this.recurso = new RecursoHospitalar()
        this.router.navigate(['/inicio'])
      }, error => {
        if (error.status == 500) {
          this.alertasService.showAlertDanger('Ocorreu um erro, tente novamente mais tarde')

        }else if(error.status == 400 ){
          this.alertasService.showAlertInfo('Quantidade da reserva não é validade')
        }
      })
    }    

  }

  converteRecursoParaRequest(recurso: RecursoHospitalar) {
     var recursoreq = new RecursoRequest()
     recursoreq.cnpj = environment.cnpj
     recursoreq.codigoFuncionario = environment.id
     recursoreq.codigoRecurso = this.idRecurso
     recursoreq.quantidade = recurso.quantidade
     recursoreq.dataFabricacao = recurso.dataFabricacao
     recursoreq.dataValidade = recurso.dataValidade
     recursoreq.lote = recurso.lote
     recursoreq.descricao = recurso.descricao
     recursoreq.fabricante = recurso.fabricante
     recursoreq.marca = recurso.marca
     recursoreq.nome = recurso.nome

     return recursoreq
  }

  buscarSolicitacaoPorId(id: number) {
    this.solicitacaoService.getByidSolicitacao(id).subscribe((resp: RecursoHospitalar) => {
      this.solicitacao = resp
    })
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
