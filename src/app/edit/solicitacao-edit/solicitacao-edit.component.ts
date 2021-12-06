import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-solicitacao-edit',
  templateUrl: './solicitacao-edit.component.html',
  styleUrls: ['./solicitacao-edit.component.css']
})
export class SolicitacaoEditComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(environment.token == '' || environment.permissao != 'ADM'){
      this.router.navigate(['/inicio'])
    }
  }

}
