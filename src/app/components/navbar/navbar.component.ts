import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: `navbar.component.html`,
})
export class NavbarComponent  {
 	title = 'Angular'; 

 	log() {
 		console.log("hello world rofl!");
 	}

}
