import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  http = inject(HttpClient);
  peliculasUrl = 'assets/peliculas.json';

  constructor() {}

  traerPeliculas() {
    return this.http.get<any>(this.peliculasUrl);
  }
}
