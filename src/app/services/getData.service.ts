import { Injectable } from "@angular/core";
import { Http, Response,Headers, RequestOptions } from "@angular/http";
import 'rxjs/add/operator/map';



@Injectable()
export class Data {
	private searchUrl: string;
	private artistUrl: string;
	private albumUrl: string;

	constructor(private http: Http) {};
	query(query: string, type="artist") {		
		return this.http.get(`https://api.spotify.com/v1/search?q=${query}&type=${type}`)
				 .map((res: Response) => res.json() );
			

	}

	getArtist(id: string) {
		return this.http.get(`https://api.spotify.com/v1/artists/${id}`)
				.map((res: Response) => res.json() );
	}

	getAlbums(artistId: string) {
		return this.http.get(`https://api.spotify.com/v1/artists/${artistId}/albums`)
				.map((res: Response) => res.json() );
	}

	getAlbum(albumId: string) {
		return this.http.get(`https://api.spotify.com/v1/albums/${albumId}`)
				.map((res: Response) => res.json() );
	}

	
}