import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule} from '@angular/common/http'

import { MypageComponent } from './mypage/mypage.component';
import { Erro404Component } from './erro404/erro404.component';
import { DataIdadePipe } from './pipes/data-idade.pipe'
import { AppFormsModule } from './app-forms/app-forms.module';
import { FiltrosComponent } from './app-forms/filtros/filtros.component';
import { ImgUrlPipe } from './pipes/img-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MainComponent,
    MypageComponent,
    Erro404Component,
    DataIdadePipe,
    FiltrosComponent,
    ImgUrlPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppFormsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule, 
   

  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [
    
  MainComponent
  ],
})
export class AppModule {}
