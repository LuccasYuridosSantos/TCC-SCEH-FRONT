import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Reserva } from 'src/app/model/Reserva';
import { ReservaService } from 'src/app/service/reserva.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-reserva-edit',
  templateUrl: './reserva-edit.component.html',
  styleUrls: ['./reserva-edit.component.css']
})
export class ReservaEditComponent implements OnInit {

  reserva: Reserva = new Reserva()

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private reservaService: ReservaService
  ) { }

  ngOnInit() {

    if (environment.token == '' || environment.permissao != 'ADM') {
      this.router.navigate(['/inicio'])
    }

    let id = this.route.snapshot.params['id']
    this.buscarReserva(id)
  }


  atualizar() {

    if (this.reserva.quantidade == null || this.reserva.dataEntrega == null) {
      alert('Preencha todos os campos')
    }else if (this.validarData(this.reserva.dataReserva, this.reserva.dataEntrega)) {
      alert('A data de entrega não pode ser menor que data da reserva')
    }else {
      
      this.reservaService.putReserva(this.reserva).subscribe((resp: Reserva) => {
        alert('Reserva atuallizada com sucesso!')
        this.router.navigate(['/inicio'])
        this.reserva = new Reserva()
      }, error => {
        if (error.status == 500) {
          alert('Ocorreu um erro, tente novamente mais tarde')

        }else if(error.status == 400 ){
          alert('Quantidade da reserva não é validade')
        }
      })
    }


  }

  buscarReserva(id: number) {
    this.reservaService.getByIdReserva(id).subscribe((resp: Reserva) => {
      this.reserva = resp
    })
  }

  validarData(dataInicio: string, dataFim: string) {
    const dateOne = new Date(dataInicio)
    const dateTwo = new Date(dataFim)
    if (dateTwo < dateOne) {
      return true
    } else {
      return false
    }
  }
}
