import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';

import { FormsModule } from '@angular/forms';
import { HeroDetailComponent } from './hero-detail/hero-detail.component'; // <-- NgModel lives here

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    HeroDetailComponent   // angular declared our component for us when we did ng g c ...
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule       // add FormsModule to the imports array
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
