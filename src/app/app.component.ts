import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Página Inicial',
      url: '/home',
      icon: 'ios-home'
    },
    {
      title: 'Login',
      url: '/login',
      icon: 'ios-man'
    },
    {
      title: 'Cliente Cadastro',
      url: '/cliente-cadastro',
      icon: 'md-person-add'
    },
    {
      title: 'Cliente',
      url: '/cliente',
      icon: 'md-person'
    },
    { 
      title: 'Funcionarios-Cadastro',
      url: '/funcionarios-cadastro',
      icon: 'ios-people'
    },
    {
      title: 'Funcionarios',
      url: '/funcionarios',
      icon: 'ios-person'
    },
    {
      title: 'Logoff',
      url: '/logoff',
      icon: 'log-out'
    },
    {
      title: 'SAC',
      url: '/enviar-atendimento',
      icon: 'call'
    },
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
