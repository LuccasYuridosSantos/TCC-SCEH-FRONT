import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../model/Funcionario';
import { FuncionarioLogin } from '../model/FuncionarioLogin';
import { Hospital } from '../model/Hospital';
import { HospitalRequest } from '../model/HospitalRequest';
import { Permissao } from '../model/Permissao';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  funcionario: Funcionario = new Funcionario()
  hospital: Hospital = new Hospital()
  hospitalReq: HospitalRequest = new HospitalRequest()
  hospitalCad: Hospital = new Hospital()
  permissao: Permissao = new Permissao()
  confimarSenha: string
  valueTipo: string = ''

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0, 0)
  }

  confirmarSenha(event: any) {
    this.confimarSenha = event.target.value
  }

  cadastrarFuncionario() {
    this.funcionario.status = true;
    this.funcionario.hospital = this.hospital;
    this.permissao.codigoPermissao = 1;
    this.funcionario.permissao = this.permissao;

    if (this.funcionario.matricula == null || this.funcionario.hospital == null ||
      this.funcionario.nome == null || this.funcionario.senha == null || this.funcionario.username == null) {
      alert('Preencha todos os campos!')
    } else if (this.confimarSenha != this.funcionario.senha) {
      console.log(this.confimarSenha)
      console.log(this.funcionario.senha)
      alert('As senhas estão incorretas!')
    } else {
      this.authService.cadastrarFuncionario(this.funcionario).subscribe((resp: Funcionario) => {
        this.funcionario = resp
        this.router.navigate(['/entrar'])
        alert('Funcionario Cadastrado com sucesso!!')

      }, erro => {
        if (erro.status == 500) {
          alert('Ocorreu um erro, tente novamente mais tarde')
        }
      })
    }
  }

  cadastrarHospital(){

    if(this.hospitalReq == null || this.hospitalReq.cnpj == null ||this.hospitalReq.nome == null || this.hospitalReq.ddd == null 
      || this.hospitalReq.observacao == null || this.hospitalReq.telefone == null || this.hospitalReq.tipo == null){
        alert('Preencha todos os campos!')
    }else{
      this.authService.cadastrarHospital(this.hospitalReq).subscribe((resp: HospitalRequest) => {
        console.log(resp)
      
        this.router.navigate(['/entrar'])
        alert('Hospital Cadastrado com sucesso!!')

      }, erro => {
        if (erro.status == 500) {
          alert('Ocorreu um erro, tente novamente mais tarde')
        }
      })
    }


  }

  tipoHospital(event: any) {
    this.valueTipo = event.target.value;
    
    if(this.valueTipo == 'PRIVADO'){
      this.hospitalReq.tipo = this.valueTipo
    }else{
      this.hospitalReq.tipo = 'PUBLICO'
    }
    console.log(this.hospitalReq.tipo)
  }

}
