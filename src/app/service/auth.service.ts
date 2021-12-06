import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Funcionario } from '../model/Funcionario';
import { FuncionarioLogin } from '../model/FuncionarioLogin';
import { HospitalRequest } from '../model/HospitalRequest';
import { RecursoRequest } from '../model/RecursoRequest';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }


  entrar(funcionarioLogin: FuncionarioLogin): Observable<FuncionarioLogin>{
    return this.http.post<FuncionarioLogin>('http://localhost:8080/funcionario/logar', funcionarioLogin)
  }

  cadastrarFuncionario(funcionario: Funcionario): Observable<Funcionario>{
    return this.http.post<Funcionario>('http://localhost:8080/funcionario/cadastrar', funcionario)
  }

  cadastrarHospital(hospitalReq: HospitalRequest): Observable<HospitalRequest>{
    return this.http.post<HospitalRequest>('http://localhost:8080/hospital/cadastrar', hospitalReq)
  }

  cadastrarRecurso(recursoReq: RecursoRequest): Observable<RecursoRequest> {
    return this.http.post<RecursoRequest>('http://localhost:8080/recurso/cadastrar', recursoReq, this.token)
  }

  logado(){
    let ok:boolean = false

    if(environment.token != ''){
      ok = true
    }

    return ok
  }
}
