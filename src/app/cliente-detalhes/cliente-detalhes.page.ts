import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Cliente } from '../model/clientes';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-cliente-detalhes',
  templateUrl: './cliente-detalhes.page.html',
  styleUrls: ['./cliente-detalhes.page.scss'],
})
export class ClienteDetalhesPage implements OnInit {

  id : string; // armazena o id para consulta
  formGroup : FormGroup; // dados do formulário
  cliente : Cliente = new Cliente(); // armazena o cliente da consulta

constructor(private actRoute : ActivatedRoute, //captura o ID
  private formB : FormBuilder, // Inicializa o formulário
  private db: AngularFirestore, //banco de dados do firestone
  private toastCtrl : ToastController, // Exibe uma mensagem
  private router : Router, // Redirecionamento de paginas 
  private alertController : AlertController) {  //Exibe mensagem de confirmação
    

    // captura o id do cliente
    this.id = this.actRoute.snapshot.paramMap.get('id');

    //inicializando o formulário
    this.formGroup = this.formB.group({
      nomeCompleto : [],
      senha : [],
      email : [],
      dataNascimento : [],
      telefone : [],
      cpf : [],
    })
   }

ngOnInit() {
  // Carregar os dados do Cliente selecionado
  this.db.collection("clientes") // Seleciona a coleção Cliente do firebase
  .doc(this.id).get().subscribe(response=>{ // .doc seleciona o cliente com base no id

    // atribuindo os dados do response para a variavel cliente 
  this.cliente.id = this.id;
  this.cliente.nomeCompleto = response.data().nomeCompleto;
  this.cliente.senha = response.data().senha;
  this.cliente.email = response.data().email;
  this.cliente.dataNascimento = response.data().dataNascimento;
  this.cliente.telefone = response.data().telefone;
  this.cliente.cpf = response.data().cpf;
  })
}
atualizar(){
  //atualiza os dados do cliente
  this.db.collection('clientes') //seleciona a coleção cliente
  .doc(this.cliente.id) // seleciona pelo ID do cliente
    .set(this.formGroup.value) // Envia o formGroup com os dados selecionados
      .then(() =>{
        this.presentToast(); // Dados atualizados
      }).catch(()=>{
        console.log('Erro ao Atualizar') // Erro ao atualizar
      })
}
excluir(){
  this.db.collection('clientes') // seleciona a coleção cliente
    .doc(this.cliente.id) // seleciona pelo ID do cliente
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

