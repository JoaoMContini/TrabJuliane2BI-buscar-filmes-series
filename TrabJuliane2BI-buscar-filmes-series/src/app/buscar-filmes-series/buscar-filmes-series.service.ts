import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class buscarFilmesSeriesService {
  private readonly baseUrl = 'http://www.omdbapi.com/?i=tt3896198&apikey=30efcba9';
  private httpClient: HttpClient = inject(HttpClient);

  buscarFilme(titulo: string): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}&t=${titulo}&plot=full&r=json`);
  }
}
