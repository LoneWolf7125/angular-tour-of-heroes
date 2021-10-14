import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  // Input decorator states that the variable will be
    // passed into the component through property binding
  @Input() hero?: Hero;

  constructor() { }

  ngOnInit(): void {
  }

}
