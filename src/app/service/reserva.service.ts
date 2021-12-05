import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Reserva } from '../model/Reserva';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  getAllReserva() : Observable<Reserva[]>{
    return this.http.get<Reserva[]>('http://localhost:8080/reserva', this.token)
  }

  getAllReservaPorHospital(cnpj: string):Observable<Reserva[]>{
    return this.http.get<Reserva[]>('http://localhost:8080/reserva/hospital/'+cnpj, this.token)
  
  }

  postReserva(reserva: Reserva): Observable<Reserva>{
    return this.http.post<Reserva>('http://localhost:8080/recurso/cadastrar',reserva, this.token)
  }

  putReserva(reserva: Reserva): Observable<Reserva>{
    return this.http.put<Reserva>('http://localhost:8080/recurso/atualizar',reserva, this.token)
  }

  deleteReserva(id: number): Observable<Reserva>{
    return this.http.post<Reserva>('http://localhost:8080/reserva/deletar/'+id, this.token)
  }
}
