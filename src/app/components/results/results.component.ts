import { Component, OnInit, Input,  } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: "<results></results>",
	templateUrl: "results.component.html"
})

export class ResultsComponent {

	@Input() results: {};
	constructor() {
	}

}