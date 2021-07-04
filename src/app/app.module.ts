import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./shared/material.module";
import { SearchComponent } from './components/search/search.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {HttpClientModule} from "@angular/common/http";
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";
import {environment} from "../environments/environment";
import { GifsOverviewComponent } from './components/gifs/overview/overview.component';
import { GifComponent } from './components/gifs/detail/detail.component';
import {CommonModule} from "@angular/common";
import {ShareModule} from "ngx-sharebuttons";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MasonryGalleryModule} from "ngx-masonry-gallery";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavouritesComponent,
    GifComponent,
    ToolbarComponent,
    GifsOverviewComponent,
    GifComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    CommonModule,
    ShareModule,
    FontAwesomeModule,
    MasonryGalleryModule
  ],
  providers: [
    {
      provide: 'API_KEY',
      useValue: environment.API_KEY,
    },
    {
      provide: 'API_BASE_URL',
      useValue: environment.API_BASE_URL,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
