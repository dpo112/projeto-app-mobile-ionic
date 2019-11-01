import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Funcionarios } from '../model/funcionarios';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-funcionarios-detalhes',
  templateUrl: './funcionarios-detalhes.page.html',
  styleUrls: ['./funcionarios-detalhes.page.scss'],
})
export class FuncionariosDetalhesPage implements OnInit {

  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  funcionarios : Funcionarios = new Funcionarios(); // armazena o funcionarios da consulta

constructor(private actRoute : ActivatedRoute, //captura o ID
  private formB : FormBuilder, // Inicializa o formulário
  private db: AngularFirestore, //banco de dados do firestone
  private toastCtrl : ToastController, // Exibe uma mensagem
  private router : Router, // Redirecionamento de paginas 
  private alertController : AlertController) {  //Exibe mensagem de confirmação
    

    // captura o id do funcionarios
    this.id = this.actRoute.snapshot.paramMap.get('id');

    //inicializando o formulário
    this.formGroup = this.formB.group({
      matricula : [],
      nome : [],
      salario : [],
      cargo : [],
      email : [],
      cpf : [],
    })
   }

ngOnInit() {
  // Carregar os dados do funcionarios selecionado
  this.db.collection("funcionarios") // Seleciona a coleção funcionarios do firebase
  .doc(this.id).get().subscribe(response=>{ // .doc seleciona o funcionarios com base no id

    // atribuindo os dados do response para a variavel funcionarios 
  this.funcionarios.id = this.id;
  this.funcionarios.matricula = response.data().matricula;
  this.funcionarios.nome = response.data().nome;
  this.funcionarios.salario = response.data().salario;
  this.funcionarios.cargo = response.data().cargo;
  this.funcionarios.email = response.data().email;
  this.funcionarios.cpf = response.data().cpf;
  })
}
atualizar(){
  //atualiza os dados do funcionarios
  this.db.collection('funcionarios') //seleciona a coleção funcionarios
  .doc(this.funcionarios.id) // seleciona pelo ID do funcionarios
    .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
      .then(() =>{
        this.presentToast(); // Dados atualizados
      }).catch(()=>{
        console.log('Erro ao Atualizar') // Erro ao atualizar
      })
}
excluir(){
  this.db.collection('funcionarios') // seleciona a coleção funcionarios
    .doc(this.funcionarios.id) // seleciona pelo ID do funcionarios
      .delete().then(()=>{ // Executa a exclusão

    this.router.navigate(['home']) // redireciona para home
  })
}
async presentToast() {
  const toast = await this.toastCtrl.create({
    message: 'Atualizado com sucesso',
    duration: 2000
  });
  toast.present();
  }
  async confirm() {
    const alert = await this.alertController.create({
      header: 'Mensagem',
      message: 'Deseja Excluir?',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

          }
        }, {
          text: 'Sim',
          handler: () => {
            this.excluir()
          }
        }
      ]
    });

    await alert.present();
  }
 }