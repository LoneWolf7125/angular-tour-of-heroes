import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroesComponent } from './heroes/heroes.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';

const routes: Routes = [

  /**
   * path: a string that matches the URL of the route
   * component: the specific component to display in this route
   * 
   * tells the router to match the URL localhost:4200/heroes to the heroes component
   */

  { path: 'heroes', component: HeroesComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },  // sets a default route
  { path: 'detail/:id', component: HeroDetailComponent }, // :id means id is a placeholder -- includes in url
];

@NgModule({
  /**
   * forRoot(): configures the router at the root level 
   *    supplies the service with providers and directives needed for routing 
   */
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }