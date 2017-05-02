import { NgModule}      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";

import { AppComponent }  from './app.component';
import { NavbarComponent } from "./components/navbar/navbar.component";
import { SearchComponent } from "./components/search/search.component";
import { AboutComponent } from "./components/about/about.component";
import { ResultsComponent  } from "./components/results/results.component";
import { ResultItemComponent  } from "./components/results/result-item.component";
import { ArtistComponent  } from "./components/artist/artist.component";
import { AlbumComponent  } from "./components/album/album.component";
import { AppRouterProviders } from "./app.routes";
import { Data } from "./services/getData.service";

import { HttpModule } from "@angular/http";

@NgModule({
  imports:      [ BrowserModule, AppRouterProviders, FormsModule, HttpModule ],
  declarations: [ AppComponent, NavbarComponent, SearchComponent, AboutComponent, ResultsComponent, ResultItemComponent, ArtistComponent, AlbumComponent],
  providers: [Data],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
