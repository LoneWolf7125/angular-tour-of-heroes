import { Injectable } from '@angular/core';
import { Hero } from './hero';
//import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

/**
 * services are used to share data between classes that don't know each other
 * helps to keep classes loosely coupled
 */

/**
 * Injectable Decorator registers the class with Angular's Dependency Injection system
 * 
 * Dependency Injection: 
 *    process of letting a framework (Angular/Spring) manage
 *      objects, instead of the developer
 *    Rather than creating objects ourselves with the 'new' keyword
 *      we simply ask the framework for the object
 * 
 * Injector - the object responsible for choosing and injecting the 
 *    provider when the application requests it
 * 
 * Letting Angular manage a class also allows for Angular to automatically optimize
 *    your app by removing the class if it turns out to not be used
 */

@Injectable({

  /**
   * the CLIs 'ng generage service ....' command automatically creates the provider
   *    the provider is registered to the root injector by default 
   * 
   * providers at the root level are singletons
   */
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';  // URL to web api

  /**
   * an observable is anything you want to observe: like an asynchronous server call
   *    essentially an Observable is something that you want to wait and 'observe;
   *      for what it returns
   *    similar to a promise
   * Observables are also lazy: not executed until they are subscribed to 
   */
  // GET heroes from the server
  getHeroes(): Observable<Hero[]> {
    /*// of() simulates getting our mock data from a server by returning an Observable 
    const heroes = of(HEROES);  

    // using the Message Service to send an 'added' message 
    this.messageService.add('HeroService: fetched heroes');

    return heroes;*/
    return this.http.get<Hero[]>(this.heroesUrl).pipe(
          tap(_ => this.log('fetched heroes')),
          catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  /**
    * Handle Http operation that failed.
    * Let the app continue.
    * @param operation - name of the operation that failed
    * @param result - optional value to return as the observable result
    */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

    // TODO: send the error to remote logging infrastructure
    console.error(error); // log to console instead

    // TODO: better job of transforming error for user consumption
    this.log(`${operation} failed: ${error.message}`);

    // Let the app keep running by returning an empty result.
    return of(result as T);
  };
}

  /**
    getHero(id: number): Observable<Hero> {
      // For now, assume that a hero with the specified `id` always exists.
      // Error handling will be added in the next step of the tutorial.
      const hero = HEROES.find(h => h.id === id)!;
      this.messageService.add(`HeroService: fetched hero id=${id}`);
      return of(hero);
    } */
  /** GET hero by id. Will 404 if id not found */
  getHero(id: number): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
  );
}

 /** GET hero by id. Return `undefined` when id not found */
 getHeroNo404<Data>(id: number): Observable<Hero> {
  const url = `${this.heroesUrl}/?id=${id}`;
  return this.http.get<Hero[]>(url)
    .pipe(
      map(heroes => heroes[0]), // returns a {0|1} element array
      tap(h => {
        const outcome = h ? `fetched` : `did not find`;
        this.log(`${outcome} hero id=${id}`);
      }),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
}

  /** PUT: update the hero on the server */
  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    );
  }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`added hero w/ id=${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }



  // service-in-service: inject the message service into the hero service 
      // which is injected into the hero component 
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
    
  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);

  }

  /* GET heroes whose name contains search term */
  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }

    /** DELETE: delete the hero from the server */
    deleteHero(id: number): Observable<Hero> {
      const url = `${this.heroesUrl}/${id}`;
  
      return this.http.delete<Hero>(url, this.httpOptions).pipe(
        tap(_ => this.log(`deleted hero id=${id}`)),
        catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}

