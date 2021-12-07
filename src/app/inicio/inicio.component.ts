import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { RecursoHospitalar } from '../model/RecursoHospitalar';
import { RecursoRequest } from '../model/RecursoRequest';
import { Reserva } from '../model/Reserva';
import { SolicitacaoRequest } from '../model/SolicitacaoRequest';
import { AlertasService } from '../service/alertas.service';
import { AuthService } from '../service/auth.service';
import { RecursoService } from '../service/recurso.service';
import { ReservaService } from '../service/reserva.service';
import { SolicitacaoService } from '../service/solicitacao.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  nome = environment.nome
  cnpj = environment.cnpj
  recursoRequest: RecursoRequest = new RecursoRequest()
  listaRecurso: RecursoHospitalar[]
  listaRecursoDoHospital: RecursoHospitalar[]
  listaReserva: Reserva[]
  listaSolicitacao: RecursoHospitalar[]
  solicitacaoRequest: SolicitacaoRequest = new SolicitacaoRequest()




  constructor(
    private router: Router,
    private auth: AuthService,
    private recursoService: RecursoService,
    private reservaService: ReservaService,
    private solicitacaoService: SolicitacaoService,
    private alertasAlertas: AlertasService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      this.alertasAlertas.showAlertInfo('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }

    this.buscarTodosRecursos()
    this.buscarTodosRecursosDoHospital()
    this.buscarTodasReservasHospital()
    this.buscarTodasSolicitacaoDoHospital()
  }

  buscarTodosRecursos() {
    this.recursoService.getAllRecurso(environment.cnpj).subscribe((resp: RecursoHospitalar[]) => {
      this.listaRecurso = resp
    })
  }

  buscarTodosRecursosDoHospital() {
    this.recursoService.getAllRecursoPorHospital(environment.cnpj).subscribe((resp: RecursoHospitalar[]) => {
      this.listaRecursoDoHospital = resp
    })
  }

  buscarTodasSolicitacaoDoHospital() {
    this.solicitacaoService.getAllSolicitacaoPorHospital(environment.cnpj).subscribe((resp: RecursoHospitalar[]) => {
      this.listaSolicitacao = resp
    })
  }
  
  buscarTodasReservasHospital() {
    this.reservaService.getAllReservaPorHospital(environment.cnpj).subscribe((resp: Reserva[]) => {
      this.listaReserva = resp
    })
  }

  cadastrarRecurso() {

    this.recursoRequest.cnpj = environment.cnpj
    this.recursoRequest.codigoFuncionario = environment.id

    if (this.recursoRequest.dataFabricacao == null || this.recursoRequest.dataValidade == null || this.recursoRequest.fabricante == null
      || this.recursoRequest.lote == null || this.recursoRequest.marca == null || this.recursoRequest.quantidade == null || this.recursoRequest.nome == null) {

        this.alertasAlertas.showAlertInfo('Preencha todos os campos!')
      

    } else if (this.dataDeValidadeEInvalida(this.recursoRequest.dataFabricacao, this.recursoRequest.dataValidade)) {

      this.alertasAlertas.showAlertInfo('Data de validade não pode ser menor ou igual a de fabricação!')
      

    }else if (this.recursoRequest.quantidade <= 0) {

      this.alertasAlertas.showAlertInfo('Quantidade invalida, quantidade precisa ser maior do que zero')

    } else {
      this.recursoService.postRecurso(this.recursoRequest).subscribe((resp: RecursoRequest) => {
        this.recursoRequest = resp
        this.alertasAlertas.showAlertSuccess('Recurso Cadastrado com Sucesso')
        this.recursoRequest = new RecursoRequest()
      })

    }

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

  usuarioComPermissao(){
    if(environment.permissao == 'ADM' || environment.permissao == 'ROOT'){
      return true
    }
    return false
  }


  cadastrarSolicitacao(){
    this.solicitacaoRequest.cnpj = environment.cnpj
    this.solicitacaoRequest.codigoFuncionario = environment.id
    this.solicitacaoRequest.ativo = true

    if (this.solicitacaoRequest.quantidade == null || this.solicitacaoRequest.nome == null ||
      this.solicitacaoRequest.marca == null || this.solicitacaoRequest.fabricante == null ||
      this.solicitacaoRequest.descricao == null) {
        this.alertasAlertas.showAlertInfo('Preeencha todos os campos')
    } else if (this.solicitacaoRequest.quantidade <= 0) {
      this.alertasAlertas.showAlertInfo('Quantidade invalida, quantidade precisa ser maior do que zero')
    } else {
      this.solicitacaoService.postSolicitacao(this.solicitacaoRequest).subscribe((resp: SolicitacaoRequest) => {
        this.solicitacaoRequest = resp
        this.alertasAlertas.showAlertSuccess('Solicitação Cadastrada com Sucesso')
        this.router.navigate(['/inicio'])
        this.solicitacaoRequest =  new SolicitacaoRequest()
      })
    }

  }

  urgenteTrue() {
    this.solicitacaoRequest.urgencia = true
  }

  urgenteFalse() {
    this.solicitacaoRequest.urgencia = false
  }

}
