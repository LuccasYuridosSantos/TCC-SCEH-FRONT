import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { FuncionarioLogin } from '../model/FuncionarioLogin';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-menu-home',
  templateUrl: './menu-home.component.html',
  styleUrls: ['./menu-home.component.css']
})
export class MenuHomeComponent implements OnInit {


  funcionarioLogin: FuncionarioLogin = new FuncionarioLogin()

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  entrar(){
    this.auth.entrar(this.funcionarioLogin).subscribe((resp: FuncionarioLogin)=>{
      this.funcionarioLogin = resp

      environment.token = this.funcionarioLogin.token
      environment.nome = this.funcionarioLogin.nome
      environment.id = this.funcionarioLogin.codigoFuncionario
      environment.nomeFantasia = this.funcionarioLogin.nomeHospital
      environment.cnpj = this.funcionarioLogin.cnpj
      environment.permissao = this.funcionarioLogin.permissao

      this.router.navigate(['/inicio'])

    }, erro =>{
      if(erro.status == 500){
        alert('Usuário ou senha estão incorretos!')
      }
    })

  }

}
