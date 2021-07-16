import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GifComponent} from "./components/gifs/detail/detail.component";
import {SearchComponent} from "./components/search/search.component";
import {FavouritesComponent} from "./components/favourites/favourites.component";
import {GifsOverviewComponent} from "./components/gifs/overview/overview.component";

const routes: Routes = [
  {
    path: '',
    component: GifsOverviewComponent
  },
  {
    path: 'search',
    component: GifsOverviewComponent
  },
  {
    path: 'gif/:id',
    component: GifComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  },
  {
    path: 'gif',
    redirectTo: ''
  },
  { path: '**',
    redirectTo: ''}
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
