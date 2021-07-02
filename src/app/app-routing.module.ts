import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GifComponent} from "./components/gif/gif.component";
import {SearchComponent} from "./components/search/search.component";
import {FavouritesComponent} from "./components/favourites/favourites.component";

const routes: Routes = [
  {
    path: '',
    component: SearchComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'gif/:id',
    component: GifComponent
  },
  {
    path: 'favourites',
    component: FavouritesComponent
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
