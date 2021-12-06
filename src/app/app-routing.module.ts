import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { ContatoComponent } from './contato/contato.component';
import { RecursoDeleteComponent } from './edit/recurso-delete/recurso-delete.component';
import { RecursoEditComponent } from './edit/recurso-edit/recurso-edit.component';
import { ReservaDeleteComponent } from './edit/reserva-delete/reserva-delete.component';
import { ReservaEditComponent } from './edit/reserva-edit/reserva-edit.component';
import { SolicitacaoDeleteComponent } from './edit/solicitacao-delete/solicitacao-delete.component';
import { SolicitacaoEditComponent } from './edit/solicitacao-edit/solicitacao-edit.component';
import { EntrarComponent } from './entrar/entrar.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReservaComponent } from './reserva/reserva.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';

const routes: Routes = [
  {path: '', redirectTo: 'entrar', pathMatch: 'full'},
  {path: 'entrar', component: EntrarComponent},
  {path: 'contato',component: ContatoComponent },
  {path: 'sobre-nos', component: SobreNosComponent},
  {path: 'cadastrar', component: CadastrarComponent},
  {path: 'inicio', component: InicioComponent},
  {path: 'reserva/:id', component: ReservaComponent},
  {path: 'reserva-edit/:id', component: ReservaEditComponent},
  {path: 'reserva-delete/:id', component: ReservaDeleteComponent},
  {path: 'solicitacao', component: SolicitacaoComponent},
  {path: 'solicitacao-edit/:id', component: SolicitacaoEditComponent},
  {path: 'solicitacao-delete/:id', component: SolicitacaoDeleteComponent},
  {path: 'recurso-edit/:id', component: RecursoEditComponent},
  {path: 'recurso-delete/:id', component: RecursoDeleteComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
