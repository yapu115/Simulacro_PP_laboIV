import { Component, EventEmitter, Output } from '@angular/core';
import { ApiRequestService } from '../../../services/api-request.service';
import { RouterOutlet } from '@angular/router';
import { PeliculasService } from '../../../services/peliculas.service';
import { Pelicula } from '../../../classes/pelicula';

@Component({
  selector: 'app-tabla-peliculas',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './tabla-peliculas.component.html',
  styleUrl: './tabla-peliculas.component.css',
})
export class TablaPeliculasComponent {
  peliculas: any[] = [];
  constructor(protected peliculasServicio: PeliculasService) {
    this.peliculasServicio.traerPeliculas().subscribe((data) => {
      this.peliculas = data;
      console.log(this.peliculas);
    });
  }

  @Output() eventoUsuario: EventEmitter<Pelicula> =
    new EventEmitter<Pelicula>();

  GuardarDatos(pelicula: any) {
    this.eventoUsuario.emit(
      new Pelicula(
        pelicula.ID,
        pelicula.Nombre,
        pelicula.Tipo,
        pelicula.Fecha_de_estreno,
        pelicula.cantidad_de_publico,
        pelicula.Foto_de_la_pelicula,
        pelicula.Protagonista
      )
    );
  }
}
