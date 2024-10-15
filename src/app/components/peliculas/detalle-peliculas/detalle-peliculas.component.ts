import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PeliculasService } from '../../../services/peliculas.service';
import { Pelicula } from '../../../classes/pelicula';

@Component({
  selector: 'app-detalle-peliculas',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './detalle-peliculas.component.html',
  styleUrl: './detalle-peliculas.component.css',
})
export class DetallePeliculasComponent {
  @Input() detallePelicula: Pelicula | null = null;

  constructor(protected peliculasServ: PeliculasService) {}

  mostrarPeli() {
    console.log(this.detallePelicula);
  }
}
