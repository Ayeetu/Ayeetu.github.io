import { Component } from '@angular/core';
import { SearchComponent } from "./components/search/search.component";
@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: `app.component.html`,
})
export class AppComponent  { name = 'Angular'; }
