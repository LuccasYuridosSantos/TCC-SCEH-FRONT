import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Funcionario } from '../model/Funcionario';
import { FuncionarioLogin } from '../model/FuncionarioLogin';
import { Hospital } from '../model/Hospital';
import { HospitalRequest } from '../model/HospitalRequest';
import { Permissao } from '../model/Permissao';
import { AlertasService } from '../service/alertas.service';
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
    private router: Router,
    private alertasService: AlertasService
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
      this.alertasService.showAlertInfo('Preencha todos os campos!')
    } else if (this.confimarSenha != this.funcionario.senha) {
      this.alertasService.showAlertInfo('As senhas estão incorretas!')
    } else {
      this.authService.cadastrarFuncionario(this.funcionario).subscribe((resp: Funcionario) => {
        this.funcionario = resp
        this.router.navigate(['/entrar'])
        this.alertasService.showAlertSuccess('Funcionario Cadastrado com sucesso!!')

      }, erro => {
        if (erro.status == 500) {
          this.alertasService.showAlertDanger('Ocorreu um erro, tente novamente mais tarde')
        }
      })
    }
  }

  cadastrarHospital(){

    if(this.hospitalReq == null || this.hospitalReq.cnpj == null ||this.hospitalReq.nome == null || this.hospitalReq.ddd == null 
      || this.hospitalReq.observacao == null || this.hospitalReq.telefone == null || this.hospitalReq.tipo == null){
        this.alertasService.showAlertInfo('Preencha todos os campos!')
    }else{
      this.authService.cadastrarHospital(this.hospitalReq).subscribe((resp: HospitalRequest) => {
        this.router.navigate(['/entrar'])
        this.alertasService.showAlertSuccess('Hospital Cadastrado com sucesso!!')

      }, erro => {
        if (erro.status == 500) {
          this.alertasService.showAlertDanger('Ocorreu um erro, tente novamente mais tarde')
        }
        if (erro.status == 400) {
          this.alertasService.showAlertInfo('Dados invalidos')
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
  }

}
