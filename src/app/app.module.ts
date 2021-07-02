import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "./shared/material.module";
import { SearchComponent } from './components/search/search.component';
import { FavouritesComponent } from './components/favourites/favourites.component';
import { GifComponent } from './components/gif/gif.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import {HttpClientModule} from "@angular/common/http";
import { ChiplistComponent } from './components/chiplist/chiplist.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavouritesComponent,
    GifComponent,
    ToolbarComponent,
    ChiplistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
