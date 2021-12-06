import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-reserva-delete',
  templateUrl: './reserva-delete.component.html',
  styleUrls: ['./reserva-delete.component.css']
})
export class ReservaDeleteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(environment.token == '' || environment.permissao != 'ADM'){
      this.router.navigate(['/inicio'])
    }
  }

}
