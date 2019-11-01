
import { Component, OnInit } from '@angular/core';
import { Cliente } from '../model/clientes';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.page.html',
  styleUrls: ['./cliente.page.scss'],
})
export class ClientePage implements OnInit {

  listaCliente :Cliente[] = []; // variavel para armazenar os clientes  (array)

  constructor(private db: AngularFirestore, //modulo de banco de dados
     private router : Router) {

    }
    ngOnInit(){
            //solicitar os dados de coleção clientes no firebase
    this.db.collection('clientes').snapshotChanges().subscribe(response=>{

      this.listaCliente = [];

      //response retorna um objeto do firebase , precisamos converter em
      //um objeto cliente

      //forEach equivalente ao for, percorre todos os elementos do firebase
      // cada um se chama doc, ou seja converter um doc em cliente
      response.forEach(doc=>{

        let c = new Cliente(); // Cria um novo objeto cliente
        c.setCliente(doc.payload.doc.data(),doc.payload.doc.id); // coloca os dados do doc em Clientes

        this.listaCliente.push(c); // adiciona este cliente alista

      },err=>{ // em caso de erro, executa essa linha
        console.log(err);
      })
    });
    }
    goPage(idValue : string){
      // Redireciona para ClienteDetalhes
      //enviando o id do cliente(idValue)
      this.router.navigate(['cliente-detalhes',{id : idValue}]);
  }
 }