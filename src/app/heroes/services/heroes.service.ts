import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface';
import { environments } from '../../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {

  private baseUrl: string = environments.baseUrl;

  constructor( private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes`);
  }

  getHeroById( id: string ): Observable<Hero | undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${ id }`)
      .pipe(
        delay(300),
        catchError ( error => {
          console.log(error.message);
          return of(undefined);
        } )
      )
  }

  getSuggestions(query: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.baseUrl}/heroes?q=${query}&_limit=6`);
  }

}

