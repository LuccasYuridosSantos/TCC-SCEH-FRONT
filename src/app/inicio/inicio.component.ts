import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  nome = environment.nome
  cnpj = environment.cnpj

  constructor(
    private router: Router
  ) { }

  ngOnInit(){ /*
    if(environment.token == ''){
      alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }
    
    */
    
  }


  cadastrarRecurso(){
    
  }

}
