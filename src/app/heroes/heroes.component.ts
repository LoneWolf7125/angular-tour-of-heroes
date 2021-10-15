/**import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
//import { Observable, of } from 'rxjs';
//import { MessageService } from '../message.service';

// Decorator: provides angular with metadata
@Component({
  selector: 'app-heroes',     // components element selector 
  templateUrl: './heroes.component.html',   // location of template file (html)
  styleUrls: ['./heroes.component.css']     // location of component's private style sheets
})

// always export classes so that they can be imported elsewhere
export class HeroesComponent implements OnInit {

  //heroes = HEROES;    // a list of heroes: exposing the array for binding

  //selectedHero?: Hero;  // will store the hero that gets selected

  heroes: Hero[] = [];

  // question mark means optional -- variable is allowed to be undefined
  /*onSelect(hero: Hero): void {
    this.selectedHero = hero;*/
    /**
     * template literals:
     *    essentially a string for exact HTML that can contain placeholders for variables 
     *        with the ${VAR_NAME} syntax
     */
    //this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);

    /**
     * <p>${some-var}</p>
     
  }

  // injecting the HeroService into this class
  //constructor(private heroService: HeroService, private messageService: MessageService) { }
  constructor(private heroService: HeroService) { }

  // lifecycle hook: Init is used to put initialization logic
  ngOnInit() {
    // will get the data for the heroes once the class is initialized
    this.getHeroes();
  }

  /*
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes(); // synchronous signature
  }
  getHeroes(): void {
    // subscribe() is what executes the Observable
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
*/

import { Component, OnInit } from '@angular/core';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
    .subscribe(heroes => this.heroes = heroes);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.id).subscribe();
  }
}
