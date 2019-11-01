import { Component, OnInit } from '@angular/core';
import { Funcionarios } from '../model/funcionarios';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-funcionarios',
  templateUrl: './funcionarios.page.html',
  styleUrls: ['./funcionarios.page.scss'],
})
export class FuncionariosPage implements OnInit {

  listaFuncionarios :Funcionarios[] = []; // variavel para armazenar os clientes  (array)

  constructor(private db: AngularFirestore, //modulo de banco de dados
     private router : Router) {

    }
    ngOnInit(){
            //solicitar os dados de coleção clientes no firebase
    this.db.collection('funcionarios').snapshotChanges().subscribe(response=>{

      this.listaFuncionarios = [];

      //response retorna um objeto do firebase , precisamos converter em
      //um objeto cliente

      //forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja converter um doc em cliente
      response.forEach(doc=>{

        let f = new Funcionarios(); // Cria um novo objeto cliente
        f.setFuncionarios(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em Clientes

        this.listaFuncionarios.push(f); // adiciona este cliente alista

      },err=>{ // em caso de erro, executa essa linha
        console.log(err);
      })
    });
    }
    goPage(idValue : string){
      // Redireciona para ClienteDetalhes
      //enviando o id do cliente(idValue)
      this.router.navigate(['funcionarios-detalhes',{id : idValue}]);
  }
 }