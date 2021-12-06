import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Hospital } from '../model/Hospital';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(
    private http: HttpClient
  ) { }

  token = {
    headers: new HttpHeaders().set('Authorization', environment.token)
  }

  findByHospitalCnpj(cnpj: string): Observable<Hospital>{
    return this.http.get<Hospital>(`http://localhost:8080/hospital/cnpj/${cnpj}`, this.token)
  }
}
