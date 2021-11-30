import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { RodapeComponent } from './rodape/rodape.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { LoginComponent } from './login/login.component';
import { EntrarComponent } from './entrar/entrar.component';
import { MenuHomeComponent } from './menu-home/menu-home.component';
import { ContatoComponent } from './contato/contato.component';
import { SobreNosComponent } from './sobre-nos/sobre-nos.component';
import { SubmenuComponent } from './submenu/submenu.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    RodapeComponent,
    CadastrarComponent,
    LoginComponent,
    EntrarComponent,
    MenuHomeComponent,
    ContatoComponent,
    SobreNosComponent,
    SubmenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
