import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { EntrarComponent } from './entrar/entrar.component';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { ContatoComponent } from './contato/contato.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { SubmenuComponent } from './submenu/submenu.component';
import { InicioComponent } from './inicio/inicio.component';
import { ReservaComponent } from './reserva/reserva.component';
import { SolicitacaoComponent } from './solicitacao/solicitacao.component';
import { ReservaEditComponent } from './edit/reserva-edit/reserva-edit.component';
import { ReservaDeleteComponent } from './edit/reserva-delete/reserva-delete.component';
import { SolicitacaoEditComponent } from './edit/solicitacao-edit/solicitacao-edit.component';
import { SolicitacaoDeleteComponent } from './edit/solicitacao-delete/solicitacao-delete.component';
import { RecursoDeleteComponent } from './edit/recurso-delete/recurso-delete.component';
import { RecursoEditComponent } from './edit/recurso-edit/recurso-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    CadastrarComponent,
    EntrarComponent,
    MenuHomeComponent,
    ContatoComponent,
    SobreNosComponent,
    SubmenuComponent,
    InicioComponent,
    ReservaComponent,
    SolicitacaoComponent,
    ReservaEditComponent,
    ReservaDeleteComponent,
    SolicitacaoEditComponent,
    SolicitacaoDeleteComponent,
    RecursoDeleteComponent,
    RecursoEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: LocationStrategy, 
    useClass: HashLocationStrategy
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
