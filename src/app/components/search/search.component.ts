import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Data } from "../../services/getData.service";
import { Artist } from "../../Artist";

@Component({
  moduleId: module.id,
  selector: 'search',
  templateUrl: `search.component.html`,
})
export class SearchComponent  {
	searchStr: string;
	results: Artist[];
	constructor(private dataProvider: Data) {}
	searchMusic() {
		this.dataProvider.query(this.searchStr).subscribe(data => { this.results = data.artists.items; console.log(data)} );
	}
}
