import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-funcionarios-cadastro',
  templateUrl: './funcionarios-cadastro.page.html',
  styleUrls: ['./funcionarios-cadastro.page.scss'],
})
export class FuncionariosCadastroPage implements OnInit {
  formGroup: FormGroup;

  constructor(private formB : FormBuilder, // Inicializar o formulario (obrigatorio para formGroup)
  private db: AngularFirestore, // Inicia o banco de dados do firebbase
  private toastCtrl : ToastController) { // Exibir Mensagem


    // Inicializa o Formulário obrigatorio no construtor
  this.formGroup = this.formB.group({
    matricula : ['',Validators.required],
    nome : ['',Validators.required],
    salario : ['',Validators.required],
    cargo : ['',Validators.required],
    email : ['',Validators.required],
    cpf : ['',Validators.required],

  });
 }

ngOnInit() {
}
cadastrar(){
  this.db.collection('funcionarios') // Seleciono a coleção do firebase
  .add(this.formGroup.value).then(() =>{ //.add realiza o cadastro, os dados do formGroup
    this.presentToast(); // Dadis cadastrados com sucesso
  }).catch(()=>{
    console.log("Erro ao Cadastrar") // Erro
  });
  //then -> Sucesso
  //catch -> Erro
}
// Template para toastController
async presentToast(){
  const toast = await this.toastCtrl.create({
    message: 'Cadastro com sucesso',
    duration: 2000  
  });
  toast.present();
}

}