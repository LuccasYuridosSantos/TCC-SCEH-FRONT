import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { RecursoHospitalar } from '../model/RecursoHospitalar';
import { RecursoRequest } from '../model/RecursoRequest';
import { Reserva } from '../model/Reserva';
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



  constructor(
    private router: Router,
    private auth: AuthService,
    private recursoService: RecursoService,
    private reservaService: ReservaService,
    private solicitaService: SolicitacaoService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    if (environment.token == '') {
      alert('Sua seção expirou, faça o login novamente')
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
    this.solicitaService.getAllSolicitacaoPorHospital(environment.cnpj).subscribe((resp: RecursoHospitalar[]) => {
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

      alert('Preencha todos os campos!')
      this.recursoRequest = new RecursoRequest()

    } else if (this.dataDeValidadeEInvalida(this.recursoRequest.dataFabricacao, this.recursoRequest.dataValidade)) {

      alert('Data de validade não pode ser menor ou igual a de fabricação!')
      this.recursoRequest = new RecursoRequest()

    } else {
      this.recursoService.postRecurso(this.recursoRequest).subscribe((resp: RecursoRequest) => {
        this.recursoRequest = resp
        console.log(this.recursoRequest)
        alert('Recurso Cadastrado com Sucesso')
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
    if(environment.permissao == 'ADM'){
      return true
    }
    return false
  }

}
