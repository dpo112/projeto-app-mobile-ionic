import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {
  email : string;
  constructor(public afAuth: AngularFireAuth,
    private router : Router,
    private toastCtrl : ToastController) { }

  ngOnInit() {
  }
recuperarSenha(){
  return this.afAuth.auth.sendPasswordResetEmail(this.email).then(()=>{
    this.presentToast("Enviado redefinição de senha para seu e-mail");
    this.router.navigate(['/login'])
  }).catch(()=>{
    this.presentToast("email inválido")
  });
  }
  async presentToast(msg : string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
