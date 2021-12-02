import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Funcionario } from '../model/Funcionario';
import { FuncionarioLogin } from '../model/FuncionarioLogin';
import { HospitalRequest } from '../model/HospitalRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }


  entrar(funcionarioLogin: FuncionarioLogin): Observable<FuncionarioLogin>{
    return this.http.post<FuncionarioLogin>('http://localhost:8080/funcionario/logar', funcionarioLogin)
  }

  cadastrarFuncionario(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.post<Funcionario>('http://localhost:8080/funcionario/cadastrar', funcionario)
  }

  cadastrarHospital(hospitalReq: HospitalRequest): Observable<HospitalRequest>{
    return this.http.post<HospitalRequest>('http://localhost:8080/hospital/cadastrar', hospitalReq)
  }

  buscarHospitalPorFuncionario(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.post<Funcionario>('http://localhost:8080/funcionario/cadastrar', funcionario)
  }

  logado(){
    let ok:boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }
}
