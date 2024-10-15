import { doc } from '@angular/fire/firestore';

export class Actor {
  nombre: string;
  apellido: string;
  documento: number;
  edad: number;
  pais: string;
  idFirebase: string;

  constructor(
    nombre: string,
    apellido: string,
    documento: number,
    edad: number,
    pais: string
  ) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.documento = documento;
    this.edad = edad;
    this.pais = pais;
    this.idFirebase = '';
  }
}
