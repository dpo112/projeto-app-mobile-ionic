export class Funcionarios{
    id : string;
    matricula : string;
    nome : string;
    salario : string;
    cargo : string;
    email : string;
    cpf : string;

    setFuncionarios(obj : any, id : any){
        this.id = id;
        this.matricula = obj.matricula;
        this.nome = obj.nome;
        this.salario = obj.salario;
        this.cargo = obj.cargo;
        this.email = obj.email;
        this.cpf = obj.cpf;

    }

}