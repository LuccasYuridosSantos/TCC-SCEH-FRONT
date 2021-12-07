import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoHospitalar } from 'src/app/model/RecursoHospitalar';
import { RecursoRequest } from 'src/app/model/RecursoRequest';
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
  solicitacaoRequest: RecursoRequest = new RecursoRequest()

  constructor(
    private router: Router,
    private solicitacaoService: SolicitacaoService,
    private route: ActivatedRoute
    ) { }

  ngOnInit() {
    if(environment.token == '' || environment.permissao != 'ADM'){
      this.router.navigate(['/inicio'])
    }

    this.idRecurso = this.route.snapshot.params['id']
    this.buscarSolicitacaoPorId(this.idRecurso)
  }


  atualizar(){

  }



  buscarSolicitacaoPorId(id: number){
    this.solicitacaoService.getByidSolicitacao(id).subscribe((resp: RecursoHospitalar)=>{
      this.recurso = resp
    })
  }

}
