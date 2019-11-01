export class Atendimento{
    id: string;
    produto: string;
    data :string;
    defeito: string;
    descricao: string;
    


    setAtendimento(obj: any, id : any){
        this.id = id;
        this.produto = obj.produto;
        this.data = obj.data;
        this.defeito = obj.defeito;
        this.descricao = obj.descricao;
        
    }
}