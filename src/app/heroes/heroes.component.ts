import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
//import { HEROES } from '../mock-heroes';
import { HeroService } from '../hero.service';
//import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

// Decorator: provides angular with metadata
@Component({
  selector: 'app-heroes',     // components element selector 
  templateUrl: './heroes.component.html',   // location of template file (html)
  styleUrls: ['./heroes.component.css']     // location of component's private style sheets
})

// always export classes so that they can be imported elsewhere
export class HeroesComponent implements OnInit {

  //heroes = HEROES;    // a list of heroes: exposing the array for binding

  selectedHero?: Hero;  // will store the hero that gets selected

  heroes: Hero[] = [];

  // question mark means optional -- variable is allowed to be undefined
  onSelect(hero: Hero): void {
    this.selectedHero = hero;
    /**
     * template literals:
     *    essentially a string for exact HTML that can contain placeholders for variables 
     *        with the ${VAR_NAME} syntax
     */
    this.messageService.add(`HeroesComponent: Selected hero id=${hero.id}`);

    /**
     * <p>${some-var}</p>
     */
  }

  // injecting the HeroService into this class
  constructor(private heroService: HeroService, private messageService: MessageService) { }
  
  // lifecycle hook: Init is used to put initialization logic
  ngOnInit() {
    // will get the data for the heroes once the class is initialized
    this.getHeroes();
  }

  /*
  getHeroes(): void {
    this.heroes = this.heroService.getHeroes(); // synchronous signature
  }*/
  getHeroes(): void {
    // subscribe() is what executes the Observable
    this.heroService.getHeroes().subscribe(heroes => this.heroes = heroes);
  }
}
