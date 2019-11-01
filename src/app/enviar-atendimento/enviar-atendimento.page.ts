import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Atendimento } from '../model/atendimento';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-enviar-atendimento',
  templateUrl: './enviar-atendimento.page.html',
  styleUrls: ['./enviar-atendimento.page.scss'],
})
export class EnviarAtendimentoPage implements OnInit {

  formGroup: FormGroup;
  listaAtendimento :Atendimento[] = []; // variavel para armazenar os clientes  (array)

  
  constructor(private formB : FormBuilder, // Inicializar o formulario (obrigatorio para formGroup)
    private db: AngularFirestore, // Inicia o banco de dados do firebbase
    private toastCtrl : ToastController) { // Exibir Mensagem


      // Inicializa o Formulário obrigatorio no construtor
    this.formGroup = this.formB.group({
      produto : ['',Validators.required],
      data : ['',Validators.required],
      defeito : ['',Validators.required],
      descricao: ['',Validators.required],


    });
   }
  
   ngOnInit(){
    //solicitar os dados de coleção clientes no firebase
this.db.collection('atendimentos').snapshotChanges().subscribe(response=>{

this.listaAtendimento = [];

//response retorna um objeto do firebase , precisamos converter em
//um objeto cliente

//forEach equivalente ao for, percorre todos os elementos do firebase
// cada um se chama doc, ou seja converter um doc em cliente
response.forEach(doc=>{

let a = new Atendimento(); // Cria um novo objeto cliente
a.setAtendimento(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em Clientes

this.listaAtendimento.push(a); // adiciona este cliente alista

},err=>{ // em caso de erro, executa essa linha
console.log(err);
})
});
}
  enviar(){
    this.db.collection('atendimentos') // Seleciono a coleção do firebase
    .add(this.formGroup.value).then(() =>{ //.add realiza o cadastro, os dados do formGroup
      this.presentToast(); // Dadis cadastrados com sucesso
    }).catch(()=>{
      console.log("Erro ao Enviar") // Erro
    });
    //then -> Sucesso
    //catch -> Erro
  }
  // Template para toastController
  async presentToast(){
    const toast = await this.toastCtrl.create({
      message: 'Enviado com sucesso',
      duration: 2000  
    });
    toast.present();
  }
  

}
