import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { FuncionariosCadastroPage } from './funcionarios-cadastro.page';

const routes: Routes = [
  {
    path: '',
    component: FuncionariosCadastroPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  declarations: [FuncionariosCadastroPage]
})
export class FuncionariosCadastroPageModule {}
