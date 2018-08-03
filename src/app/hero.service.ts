import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, filter } from 'rxjs/operators';

import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero> {
    return this.http
      .get<Hero>(this.heroesUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

  // getHeroesSlowly(): Promise<Hero[]> {
  //   return new Promise(resolve => {
  //     setTimeout(() => resolve(this.getHeroes()), 1000);
  //   });
  // }

  getHero(id: number): Observable<Hero> {
    return this.getHeroes().pipe(
      filter(hero => hero.id === id));
  }
}
