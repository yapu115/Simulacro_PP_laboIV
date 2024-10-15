import { Component } from '@angular/core';
import { TablaPeliculasComponent } from './tabla-peliculas/tabla-peliculas.component';
import { AltaPeliculaComponent } from '../alta-pelicula/alta-pelicula.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DetallePeliculasComponent } from './detalle-peliculas/detalle-peliculas.component';
import { Pelicula } from '../../classes/pelicula';

@Component({
  selector: 'app-peliculas',
  standalone: true,
  imports: [
    TablaPeliculasComponent,
    DetallePeliculasComponent,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './peliculas.component.html',
  styleUrl: './peliculas.component.css',
})
export class PeliculasComponent {
  pelicula: Pelicula | null = null;

  recibirPelicula(peli: Pelicula) {
    this.pelicula = peli;
  }
}
