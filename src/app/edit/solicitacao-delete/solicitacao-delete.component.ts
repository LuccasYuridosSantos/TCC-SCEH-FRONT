import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoHospitalar } from 'src/app/model/RecursoHospitalar';
import { AlertasService } from 'src/app/service/alertas.service';
import { SolicitacaoService } from 'src/app/service/solicitacao.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-solicitacao-delete',
  templateUrl: './solicitacao-delete.component.html',
  styleUrls: ['./solicitacao-delete.component.css']
})
export class SolicitacaoDeleteComponent implements OnInit {

  recurso: RecursoHospitalar = new RecursoHospitalar()
  idRecurso: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private solicitacaoService: SolicitacaoService,
    private alertasService: AlertasService
  ) { }

  ngOnInit() {
    if(environment.token == '' || this.validarPermissao){
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


  apagar(){

    this.solicitacaoService.deleteReserva(this.idRecurso).subscribe(()=>{
      this.alertasService.showAlertSuccess('Recurso Apagado com sucesso')
      this.router.navigate(['/inicio'])
    })
    

  }

  buscarSolicitacaoPorId(id: number){
    this.solicitacaoService.getByidSolicitacao(id).subscribe((resp: RecursoHospitalar)=>{
      this.recurso = resp
    })
  }

}
