import {
	Component,
	Input,
	OnInit,
	Output,
	EventEmitter,
	Inject
} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface dialogData {
	Title: string;
	Message: string;
	Value: string;
	Confirm: string;
}

@Component({
	selector: 'app-error-message',
	templateUrl: './error-message.component.html',
	styleUrls: ['./error-message.component.scss']
})
export class ErrorMessageComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) public dialogData: any,
		private dialogRef: MatDialogRef<any>
	) {}

	ngOnInit(): void {}

	returnChoice(choice: boolean) {
		this.dialogRef.close(choice);
		return choice;
	}
}
