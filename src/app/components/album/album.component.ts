import { Component, OnInit } from "@angular/core";
import { Data } from "../../services/getData.service";
import { ActivatedRoute, Params } from "@angular/router";

@Component({
	moduleId: module.id,
	selector: "album",
	templateUrl: "album.component.html"
})

export class AlbumComponent implements OnInit {

	album: {};

	constructor (private dataService: Data, private route: ActivatedRoute) {};

	mouseoverEvent(e: any) {
		e.currentTarget.classList.add("active");
		
	}

	mouseoutEvent(e: any) {
		e.currentTarget.classList.remove("active");
	}

	ngOnInit() {
		this.route.params.subscribe((params: Params) => {
			let id = params['id'];
			this.dataService.getAlbum(id)
					.subscribe(data => {this.album = data; console.log(data)});
		})
		
	}


}