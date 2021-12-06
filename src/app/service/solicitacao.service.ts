import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { RecursoHospitalar } from '../model/RecursoHospitalar';
import { SolicitacaoRequest } from '../model/SolicitacaoRequest';

@Injectable({
  providedIn: 'root'
})
export class SolicitacaoService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAll(): Observable<RecursoHospitalar[]>{
    return this.http.get<RecursoHospitalar[]>("http://localhost:8080/solicitacao", this.token)
  }

  getAllPorNome(nome: string):Observable<RecursoHospitalar[]>{
    return this.http.get<RecursoHospitalar[]>(`http://localhost:8080/solicitacao/nome/${nome}`, this.token)
  }

  getByidSolicitacao(id: number) : Observable<RecursoHospitalar>{
    return this.http.get<RecursoHospitalar>(`http://localhost:8080/solicitacao/id/${id}`, this.token)
  }

  getAllSolicitacaoPorHospital(cnpj: string):Observable<RecursoHospitalar[]>{
    return this.http.get<RecursoHospitalar[]>(`http://localhost:8080/solicitacao/hospital/${cnpj}`, this.token)
  }

  postSolicitacao(solicitacao: SolicitacaoRequest): Observable<SolicitacaoRequest>{
    return this.http.post<SolicitacaoRequest>('http://localhost:8080/solicitacao/cadastrar',solicitacao, this.token)
  }

  putSolicitacao(solicitacao: SolicitacaoRequest): Observable<SolicitacaoRequest>{
    return this.http.post<SolicitacaoRequest>('http://localhost:8080/solicitacao/atualizar',solicitacao, this.token)
  }

  deleteReserva(id: number){
    return this.http.delete(`http://localhost:8080/solicitacao/deletar/${id}`, this.token)
  }
}
