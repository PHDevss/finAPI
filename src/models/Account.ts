import { v4 as uuidv4 } from 'uuid'
import { StatementProps } from './Statement'

export interface AccountProps {
    id: string;
    cpf: string;
    name: string;
    statement: StatementProps[];
    getBalance: () => number
}

export class Account implements AccountProps{
    id:string;
    name: string;
    cpf: string;
    statement: StatementProps[];
    
    constructor(cpf: string, name: string){
        this.id= uuidv4()
        this.cpf = cpf
        this.name = name
        this.statement = []
        
        return (
            {
                id: this.id, 
                cpf: this.cpf, 
                name: this.name,
                statement: this.statement,
                getBalance: this.getBalance
            }
        )
    }
    getBalance = () => {
        if(this.statement.length === 0){
            return 0
        } else{
            return this.statement.map(elemento => elemento.amount).reduce((previusValue, currentValue) => previusValue + currentValue)
        }
    }

    // static getBalance(): number {
    //     return 5
    // }
}