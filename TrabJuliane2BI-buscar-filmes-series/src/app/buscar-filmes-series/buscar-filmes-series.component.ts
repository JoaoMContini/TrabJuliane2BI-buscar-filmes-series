import {Component, inject} from '@angular/core';
// @ts-ignore
import {buscarFilmesSeriesService} from './buscar-filmes-series.service';
// @ts-ignore
import {Filme} from './buscar-filmes-series.model';
import {FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-buscar-filmes-series',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
  ],
  templateUrl: './buscar-filmes-series.component.html',
  styleUrl: './buscar-filmes-series.component.css'
})
export class BuscarFilmesSeriesComponent {
  titulo: string = '';
  filme: Filme ;
  showFavoritos: boolean = false;
  favoritosList:string[] =  []

  buscarFilmesSeriesService = inject(buscarFilmesSeriesService);

  pesquisarFilme() {
    this.showFavoritos = false;
    // @ts-ignore
    this.buscarFilmesSeriesService.buscarFilme(this.titulo).subscribe({
      next: (data: Filme) => {
        console.log(data);
        this.filme = data;
      },
      error: (error: any) => {
        this.filme = null
      }
    });
  }

  favoritarFilme(){
    let lastFilmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
    if(lastFilmesFavoritos !== null){
      if(lastFilmesFavoritos.filmes.length > 0){
        lastFilmesFavoritos.filmes.push(this.filme);
        localStorage.setItem('favoritos', JSON.stringify(lastFilmesFavoritos));
        return
      }
    }
    let data ={
      filmes:[
       this.filme
      ]
    }
    localStorage.setItem('favoritos', JSON.stringify(data));
  }

  desfavoritarFilme() {
    let getlastFilmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));

    if (getlastFilmesFavoritos && getlastFilmesFavoritos.filmes) {
      const filmesAtualizados = getlastFilmesFavoritos.filmes.filter(filme => filme.imdbID !== this.filme.imdbID);

      localStorage.setItem('favoritos', JSON.stringify({ filmes: filmesAtualizados }));
    }
  }

  getFilmesFavoritos(){
    let lastFilmesFavoritos = JSON.parse(localStorage.getItem('favoritos'));
    console.log(lastFilmesFavoritos);
    if(lastFilmesFavoritos !== null){
        this.showFavoritos = true;
      const uniqueArray = [...new Set(lastFilmesFavoritos.filmes.map(filmes => filmes.Title))];
        this.favoritosList = uniqueArray as string[];
    }
  }

  selectFilmeFavorito(title:string){
    this.titulo = title;
    this.pesquisarFilme()
    this.showFavoritos = false;
  }
}


