import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { RecursoHospitalar } from '../model/RecursoHospitalar';
import { RecursoRequest } from '../model/RecursoRequest';
import { AuthService } from '../service/auth.service';
import { RecursoService } from '../service/recurso.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  nome = environment.nome
  cnpj = environment.cnpj
  recursoRequest: RecursoRequest = new RecursoRequest()
  listaRecurso: RecursoHospitalar[]
  listaRecursoDoHospital: RecursoHospitalar[]



  constructor(
    private router: Router,
    private auth: AuthService,
    private recursoService: RecursoService
  ) { }

  ngOnInit(){ 

    window.scroll(0,0)
    
    if(environment.token == ''){
    alert('Sua seção expirou, faça o login novamente')
      this.router.navigate(['/entrar'])
    }
    
    this.buscarTodosRecursos()
    this.buscarTodosRecursosDoHospital
  }
  
  buscarTodosRecursos(){
    this.recursoService.getAllRecurso().subscribe((resp: RecursoHospitalar[])=>{
      this.listaRecurso = resp
      console.log(this.listaRecurso)
    })
  }

  buscarTodosRecursosDoHospital(){
    this.recursoService.getAllRecursoPorHospital(environment.cnpj).subscribe((resp: RecursoHospitalar[])=>{
      this.listaRecursoDoHospital = resp
      console.log(this.listaRecursoDoHospital)
    })
  }

  cadastrarRecurso(){

    this.recursoRequest.cnpj = environment.cnpj
    this.recursoRequest.codigoFuncionario = environment.id

    console.log(this.recursoRequest.codigoFuncionario)

    if(this.recursoRequest.dataFabricacao == null || this.recursoRequest.dataValidade == null || this.recursoRequest.fabricante == null
      || this.recursoRequest.lote == null || this.recursoRequest.marca == null || this.recursoRequest.quantidade == null || this.recursoRequest.nome == null){

        alert('Preencha todos os campos!')
        this.recursoRequest = new RecursoRequest()

      }else if(this.dataDeValidadeEInvalida(this.recursoRequest.dataFabricacao, this.recursoRequest.dataValidade)){

        alert('Data de validade não pode ser menor ou igual a de fabricação!')
        this.recursoRequest = new RecursoRequest()

      }else{

        console.log(this.recursoRequest)

      this.recursoService.postRecurso(this.recursoRequest).subscribe((resp: RecursoRequest)=>{
        this.recursoRequest = resp
        console.log(this.recursoRequest)
        alert('Recurso Cadastrado com Sucesso')
        this.recursoRequest = new RecursoRequest()
      })

    }

  }

  dataDeValidadeEInvalida(dataFabricacao:string, dataValidade: string){
    const dateOne = new Date(dataFabricacao)
    const dateTwo = new Date(dataValidade)

    if (dateOne >= dateTwo) {
      return true
    }else{
      return false
    }
  }

}
