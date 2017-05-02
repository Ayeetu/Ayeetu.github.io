import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Data } from "../../services/getData.service";

@Component({
    moduleId: module.id,
    selector: "artist",
    templateUrl: "artist.component.html"

})
export class ArtistComponent implements OnInit{

	artist: any;
	albums: any;
	constructor( private dataProvider: Data, private route: ActivatedRoute) {}
	
	ngOnInit() {
		this.route.params.subscribe(params => {
			this.dataProvider.getArtist(params.id)
				.subscribe(data => {this.artist = data; console.log(data)});

			this.dataProvider.getAlbums(params.id)
				.subscribe(data => { this.albums = data.items; console.log(data)});
		});
		
	}
}