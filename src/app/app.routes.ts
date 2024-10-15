import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'peliculas',
    pathMatch: 'full',
  },
  {
    path: 'peliculas',
    loadComponent: () =>
      import('./components/peliculas/peliculas.component').then(
        (m) => m.PeliculasComponent
      ),
  },

  {
    path: 'alta-peliculas',
    loadComponent: () =>
      import('./components/alta-pelicula/alta-pelicula.component').then(
        (m) => m.AltaPeliculaComponent
      ),
  },
  {
    path: 'actores',
    loadComponent: () =>
      import('./components/actores/actores.component').then(
        (m) => m.ActoresComponent
      ),
  },
  {
    path: 'alta-actores',
    loadComponent: () =>
      import('./components/alta-actor/alta-actor.component').then(
        (m) => m.AltaActorComponent
      ),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./components/peliculas/peliculas.component').then(
        (m) => m.PeliculasComponent
      ),
  },
];
