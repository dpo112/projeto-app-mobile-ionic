import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, LoadingController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-cliente-cadastro',
  templateUrl: './cliente-cadastro.page.html',
  styleUrls: ['./cliente-cadastro.page.scss'],
})
export class ClienteCadastroPage implements OnInit {
  
  // Não esquecer de declarar ReactiveFormsModule no module.ts
  formGroup :FormGroup;  // formulario de cadastro -> armazena todos os dados 
  imagem: any;
  idUser:string;



  constructor(private formB : FormBuilder, // Inicializar o formulario (obrigatorio para formGroup)
    private db: AngularFirestore, // Inicia o banco de dados do firebbase
    private toastCtrl : ToastController,
    private fireStorage : AngularFireStorage,
    private loadingController : LoadingController) { // Exibir Mensagem


      // Inicializa o Formulário obrigatorio no construtor
    this.formGroup = this.formB.group({
      nomeCompleto : ['',Validators.required],
      senha : ['',Validators.required],
      email : ['',Validators.required],
      dataNascimento : ['',Validators.required],
      telefone : ['',Validators.required],
      cpf : ['',Validators.required],
      

    });
   }
  
  ngOnInit() {
  }
  
  cadastrar(){
    this.db.collection('clientes') // Seleciono a coleção do firebase
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
