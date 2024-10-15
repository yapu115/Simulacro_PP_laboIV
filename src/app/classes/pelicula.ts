export class Pelicula {
  id: number;
  nombre: string;
  tipo: string;
  fechaDeEstreno: string;
  cantidadDePublico: number;
  fotoDePelicula: string;
  protagonista: string;

  constructor(
    id: number,
    nombre: string,
    tipo: string,
    fechaDeEstreno: string,
    cantidadDePublico: number,
    fotoDePelicula: string,
    protagonista: string
  ) {
    this.id = id;
    this.nombre = nombre;
    this.tipo = tipo;
    this.fechaDeEstreno = fechaDeEstreno;
    this.cantidadDePublico = cantidadDePublico;
    this.fotoDePelicula = fotoDePelicula;
    this.protagonista = protagonista;
  }
}
