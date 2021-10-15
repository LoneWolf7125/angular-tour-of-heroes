import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // Input decorator states that the variable will be
    // passed into the component through property binding
  //@Input() hero?: Hero;

  hero: Hero | undefined;

  constructor(
    private route: ActivatedRoute,    // holds info about the route
    private heroService: HeroService,
    private location: Location        // angular service that interacts with the browser
  ) {}

  ngOnInit(): void {
    this.getHero();
  }
  
  getHero(): void {
    /**
     * snapshot contains what the route info was JUST after the component was created
     * paramMap is a map containing the names of parameters and their values
     *    .get('paramName') returns the value of the given parameter name 
     *    params are ALWAYS returned as strings:
     *        must cast to correct type if it isn't a string 
     */
    const id = Number(this.route.snapshot.paramMap.get('id'));    // localhost:4200/api/detail/12
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero)
        .subscribe(() => this.goBack());
    }
  }
}
