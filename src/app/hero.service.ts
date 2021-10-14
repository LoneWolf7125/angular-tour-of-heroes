import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import { Observable, of } from 'rxjs';

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

  /**
   * an observable is anything you want to observe: like an asynchronous server call
   *    essentially an Observable is something that you want to wait and 'observe;
   *      for what it returns
   *    similar to a promise
   * Observables are also lazy: not executed until they are subscribed to 
   */
  getHeroes(): Observable<Hero[]> {
    // of() simulates getting our mock data from a server by returning an Observable 
    const heroes = of(HEROES);  

    // using the Message Service to send an 'added' message 
    this.messageService.add('HeroService: fetched heroes');

    return heroes;
  }

  // service-in-service: inject the message service into the hero service 
      // which is injected into the hero component 
  constructor(private messageService: MessageService) { }
}

