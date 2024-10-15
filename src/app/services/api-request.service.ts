import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiRequestService {
  paisesUrl = 'https://restcountries.com/v3.1/all';
  http = inject(HttpClient);

  constructor() {}

  obtenerTodosLosPaises(): Observable<any> {
    return this.http.get(this.paisesUrl);
  }
}
