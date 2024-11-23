import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BuscarFilmesSeriesComponent} from './buscar-filmes-series/buscar-filmes-series.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BuscarFilmesSeriesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  title = 'TrabJuliane2BI-buscar-filmes-series';


}
