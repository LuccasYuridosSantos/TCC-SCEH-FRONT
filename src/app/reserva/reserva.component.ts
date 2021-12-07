import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Hospital } from '../model/Hospital';
import { RecursoHospitalar } from '../model/RecursoHospitalar';
import { Reserva } from '../model/Reserva';
import { AlertasService } from '../service/alertas.service';
import { HospitalService } from '../service/hospital.service';
import { RecursoService } from '../service/recurso.service';
import { ReservaService } from '../service/reserva.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {

  reserva: Reserva = new Reserva()
  recurso: RecursoHospitalar = new RecursoHospitalar()
  listaReserva: Reserva[]
  valueResult = 0

  constructor(
    private router: Router,
    private reservaService: ReservaService,
    private recursoService: RecursoService,
    private routeActive: ActivatedRoute,
    private hospitalService: HospitalService,
    private alertasService: AlertasService
  ) { }

  ngOnInit(){
    window.scroll(0,0)


    if(environment.token == '' || this.validarPermissao()){
      this.router.navigate(['/inicio'])
    }


    let id = this.routeActive.snapshot.params['id']
    this.findByIdRecurso(id)
    this.buscarTodasReservasPorRecurso(id)
  }

  validarPermissao(){
    if(environment.permissao == 'ADM' || environment.permissao == 'ROOT'){
      return false
    }else{
      return true
    }
  }

  findByIdRecurso(id: number){
    this.recursoService.getByIdRecurso(id).subscribe((resp: RecursoHospitalar)=>{
      this.recurso = resp
    })
  }

  reservarRecurso(){
    this.reserva.dataReserva = new Date().toISOString().slice(0, 10);
    this.reserva.recursoHospitalar = this.recurso
    this.reserva.solicitante = environment.nome
    this.hospitalService.findByHospitalCnpj(environment.cnpj).subscribe((resp: Hospital)=>{
      var hospital = resp
      this.reserva.hospital = hospital
    })

    this.reserva.localEntrega = this.registrarEndereco(this.reserva.hospital)

    if(this.reserva.quantidade == null || this.reserva.dataRetirada == null || this.reserva.entregador == null) {
      this.alertasService.showAlertInfo('Preencha todos os campos')
    }else if(this.recurso.quantidade < this.reserva.quantidade){
      this.alertasService.showAlertInfo('Quantidade da Reserva não pode ser maior que do recurso')
    }else if(this.validarData(this.reserva.dataReserva, this.reserva.dataRetirada)){
      this.alertasService.showAlertInfo('Data da Retirada tem que ser maior ou igual a data atual')
    }else{

      this.reservaService.postReserva(this.reserva).subscribe((resp: Reserva)=>{
        this.reserva = resp
        this.alertasService.showAlertSuccess('Reserva Feita com Sucesso')
        this.router.navigate(['/inicio'])

      }, erro => {
        if (erro.status == 500) {
          alert('Ocorreu um erro, tente novamente mais tarde')
        }
        if (erro.status == 400) {
          alert('Dados invalidos')
        }
      })
    }
  }

  buscarTodasReservasPorRecurso(id: number){
    var soma = 0

    this.reservaService.getAllReservaPorRecurso(id).subscribe((resp: Reserva[])=>{
      resp.forEach((value)=>{
        soma += value.quantidade
      })
      if(soma >= this.recurso.quantidade){
        this.alertasService.showAlertInfo('O recurso atingiu o valor maximo de reservas')
        this.router.navigate(['/inicio'])
      }

    })     
  }

  registrarEndereco(hospital: Hospital){
    return hospital.rua+", Nº "+hospital.numero+",complemento: "
    +hospital.complemento+", "+hospital.cidade+", "+hospital.estado 
  }

  validarData(dataReserva: string, dataRetirada: string) {
    const dateOne = new Date(dataReserva)
    const dateTwo = new Date(dataRetirada)

    if (dateTwo < dateOne) {
      return true
    } else {
      return false
    }
  }

}
