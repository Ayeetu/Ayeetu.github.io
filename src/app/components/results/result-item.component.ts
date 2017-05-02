import { Component, OnInit, Input } from '@angular/core';

@Component({
	moduleId: module.id,
	selector: "<result-item></result-item>",
	templateUrl: "result-item.component.html"
})

export class ResultItemComponent {
	@Input() item: string;

	
}