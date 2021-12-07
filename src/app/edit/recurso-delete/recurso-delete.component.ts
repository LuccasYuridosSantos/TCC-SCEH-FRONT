import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecursoHospitalar } from 'src/app/model/RecursoHospitalar';
import { AlertasService } from 'src/app/service/alertas.service';
import { RecursoService } from 'src/app/service/recurso.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-recurso-delete',
  templateUrl: './recurso-delete.component.html',
  styleUrls: ['./recurso-delete.component.css']
})
export class RecursoDeleteComponent implements OnInit {
  recurso: RecursoHospitalar = new RecursoHospitalar()
  idRecurso: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private recursoService: RecursoService,
    private alertasService: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)

    if (environment.token == '' || this.validarPermissao()) {
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

  apagar(){

    this.recursoService.deleteRecurso(this.idRecurso).subscribe(()=>{
      this.alertasService.showAlertSuccess('Recurso Apagado com sucesso')
      this.router.navigate(['/inicio'])
    })
    

  }

  buscarRecursoPorId(id: number){
    this.recursoService.getByIdRecurso(id).subscribe((resp: RecursoHospitalar)=>{
      this.recurso = resp
    })
  }

}
