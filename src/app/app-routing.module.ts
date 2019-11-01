import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'enviar-atendimento', loadChildren: './enviar-atendimento/enviar-atendimento.module#EnviarAtendimentoPageModule' },
  { path: 'cliente', loadChildren: './cliente/cliente.module#ClientePageModule' },
  { path: 'cliente-cadastro', loadChildren: './cliente-cadastro/cliente-cadastro.module#ClienteCadastroPageModule' },
  { path: 'cliente-detalhes', loadChildren: './cliente-detalhes/cliente-detalhes.module#ClienteDetalhesPageModule' },
  { path: 'funcionarios', loadChildren: './funcionarios/funcionarios.module#FuncionariosPageModule' },
  { path: 'funcionarios-cadastro', loadChildren: './funcionarios-cadastro/funcionarios-cadastro.module#FuncionariosCadastroPageModule' },
  { path: 'funcionarios-detalhes', loadChildren: './funcionarios-detalhes/funcionarios-detalhes.module#FuncionariosDetalhesPageModule' },
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'logoff', loadChildren: './logoff/logoff.module#LogoffPageModule' },
  { path: 'recuperar-senha', loadChildren: './recuperar-senha/recuperar-senha.module#RecuperarSenhaPageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
