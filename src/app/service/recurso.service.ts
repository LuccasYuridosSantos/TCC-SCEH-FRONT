import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { RecursoHospitalar } from '../model/RecursoHospitalar';
import { RecursoRequest } from '../model/RecursoRequest';

@Injectable({
  providedIn: 'root'
})
export class RecursoService {

  constructor(
    private http: HttpClient
  ) { }


  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }


  getAllRecurso() : Observable<RecursoHospitalar[]>{
    return this.http.get<RecursoHospitalar[]>('http://localhost:8080/recurso', this.token)
  }

  getAllRecursoPorHospital(cnpj: string):Observable<RecursoHospitalar[]>{
    return this.http.get<RecursoHospitalar[]>('http://localhost:8080/recurso/hospital/'+cnpj, this.token)
  
  }

  postRecurso(recursoRequest: RecursoRequest): Observable<RecursoRequest>{
    console.log(this.token)
    return this.http.post<RecursoRequest>('http://localhost:8080/recurso/cadastrar',recursoRequest, this.token)
  }
}
