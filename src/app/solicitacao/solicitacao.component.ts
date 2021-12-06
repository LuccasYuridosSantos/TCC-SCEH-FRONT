import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { RecursoHospitalar } from '../model/RecursoHospitalar';
import { SolicitacaoRequest } from '../model/SolicitacaoRequest';
import { SolicitacaoService } from '../service/solicitacao.service';

@Component({
  selector: 'app-solicitacao',
  templateUrl: './solicitacao.component.html',
  styleUrls: ['./solicitacao.component.css']
})
export class SolicitacaoComponent implements OnInit {
  
  listaSolicitacao: RecursoHospitalar[]
  solicitacaoRequest: SolicitacaoRequest = new SolicitacaoRequest()
  nomebusca: string

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService
  ) { }

  ngOnInit() {

    if (environment.token == '' || environment.permissao != 'ADM') {
      this.router.navigate(['/inicio'])
    }

    this.buscarTodos()
    
  }

  buscarTodos(){
    this.solicitacaoService.getAll().subscribe((resp: RecursoHospitalar[])=>{
      this.listaSolicitacao = resp
    })
  }

  buscarTodosPorNome(){
    this.solicitacaoService.getAllPorNome(this.nomebusca).subscribe((resp: RecursoHospitalar[])=>{
      this.listaSolicitacao = resp
    })
  }
}
