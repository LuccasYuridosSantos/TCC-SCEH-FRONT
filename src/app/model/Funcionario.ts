import { Hospital } from "./Hospital"
import { Permissao } from "./Permissao"

export class Funcionario{
    public codigoFuncionario!: number
    public matricula!: string
    public nome!:string
    public username!: string    
    public status!: boolean 
    public senha!: string
    public permissao!: Permissao
    public hospital!: Hospital

}