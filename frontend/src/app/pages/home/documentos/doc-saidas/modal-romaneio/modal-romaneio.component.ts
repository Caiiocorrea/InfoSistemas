import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-modal-romaneio',
	templateUrl: './modal-romaneio.component.html',
	styleUrls: ['./modal-romaneio.component.scss']
})
export class ModalRomaneioComponent implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) private dialogData: any,
		private dialogRef: MatDialogRef<any>,
		private snackbar: MatSnackBar
	) {}

	statusChanged: boolean = false;

	ngOnInit(): void {}

	changeStatus() {
		this.statusChanged = !this.statusChanged;
	}

	print() {
		this.snackbar.open('Abrindo documento para impressão...', '', {
			duration: 1500
		});
		setTimeout(() => {
			window.print();
		}, 1500);
	}
}
