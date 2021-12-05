import { Hospital } from "./Hospital";
import { RecursoHospitalar } from "./RecursoHospitalar";

export class Reserva {
    public codigoReserva!: number
	public quantidade!: number
	public dataReserva!: string
	public dataRetirada!: string
	public localEntrega!: string
	public entregador!: string
	public solicitante!: string
	public dataEntrega!: string
    public hospital!: Hospital
    public recursoHospitalar!: RecursoHospitalar
}