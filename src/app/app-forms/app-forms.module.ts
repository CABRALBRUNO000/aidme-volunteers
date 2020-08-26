import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormCadComponent } from 'src/app/app-forms/form-cad/form-cad.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppRoutingModule } from '../app-routing.module';



@NgModule({
  declarations: [
    FormCadComponent,
    
    
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule


  ]
})
export class AppFormsModule { }
