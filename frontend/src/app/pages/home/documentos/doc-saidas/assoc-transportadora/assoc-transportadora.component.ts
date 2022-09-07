import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-assoc-transportadora',
	templateUrl: './assoc-transportadora.component.html',
	styleUrls: ['./assoc-transportadora.component.scss']
})
export class AssocTransportadoraComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public dialogData: any,
		private dialogRef: MatDialogRef<any>
	) {}

	selected: string = '';
	data: any;

	ngOnInit(): void {
		this.data = this.dialogData.data;
		console.log(this.data);
	}
}
