import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoHospitalar } from 'src/app/model/RecursoHospitalar';
import { RecursoRequest } from 'src/app/model/RecursoRequest';
import { SolicitacaoRequest } from 'src/app/model/SolicitacaoRequest';
import { AlertasService } from 'src/app/service/alertas.service';
import { SolicitacaoService } from 'src/app/service/solicitacao.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-solicitacao-edit',
  templateUrl: './solicitacao-edit.component.html',
  styleUrls: ['./solicitacao-edit.component.css']
})
export class SolicitacaoEditComponent implements OnInit {

  recurso: RecursoHospitalar = new RecursoHospitalar()
  idRecurso: number
  solicitacaoRequest: SolicitacaoRequest = new SolicitacaoRequest()

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private route: ActivatedRoute,
    private alertasService: AlertasService
    ) { }

  ngOnInit() {
    if(environment.token == '' || this.validarPermissao()){
      this.router.navigate(['/inicio'])
    }

    this.idRecurso = this.route.snapshot.params['id']
    this.buscarSolicitacaoPorId(this.idRecurso)
  }

  validarPermissao(){
    if(environment.permissao == 'ADM' || environment.permissao == 'ROOT'){
      return false
    }else{
      return true
    }
  }


  atualizar(){
    this.solicitacaoRequest = this.converteRecursoParaSolicitacaoRequest(this.recurso)

    if (this.solicitacaoRequest.quantidade == null || this.solicitacaoRequest.nome == null ||
      this.solicitacaoRequest.marca == null || this.solicitacaoRequest.fabricante == null ||
      this.solicitacaoRequest.descricao == null) {
        this.alertasService.showAlertInfo('Preeencha todos os campos')
    } else if (this.solicitacaoRequest.quantidade <= 0) {
      this.alertasService.showAlertInfo('Quantidade invalida, quantidade precisa ser maior do que zero')
    } else {
      this.solicitacaoService.postSolicitacao(this.solicitacaoRequest).subscribe((resp: SolicitacaoRequest) => {
        this.solicitacaoRequest = resp
        this.alertasService.showAlertSuccess('Solicitação Atualizada com Sucesso')
        this.router.navigate(['/inicio'])
        this.solicitacaoRequest =  new SolicitacaoRequest()
      })
    }

  }



  buscarSolicitacaoPorId(id: number){
    this.solicitacaoService.getByidSolicitacao(id).subscribe((resp: RecursoHospitalar)=>{
      this.recurso = resp
    })
  }

  converteRecursoParaSolicitacaoRequest(recurso: RecursoHospitalar){
    var solicitacao = new SolicitacaoRequest()
    solicitacao.codigoRecurso = this.idRecurso
    solicitacao.quantidade = recurso.quantidade
    solicitacao.nome = recurso.nome
    solicitacao.marca = recurso.marca
    solicitacao.fabricante = recurso.fabricante
    solicitacao.descricao = recurso.descricao    
    solicitacao.urgencia = recurso.urgencia
    solicitacao.observacao = recurso.observacao
    solicitacao.ativo = true
    solicitacao.cnpj = environment.cnpj
    solicitacao.codigoFuncionario = environment.id
    
    return solicitacao
  }

  urgenteTrue() {
    this.solicitacaoRequest.urgencia = true
  }

  urgenteFalse() {
    this.solicitacaoRequest.urgencia = false
  }

}
