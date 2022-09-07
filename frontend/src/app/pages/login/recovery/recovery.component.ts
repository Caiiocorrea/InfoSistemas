import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
	selector: 'app-recovery',
	templateUrl: './recovery.component.html',
	styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {
	constructor(private matSnackBar: MatSnackBar) {}

	_form = new FormGroup({
		email: new FormControl('', Validators.required)
	});

	ngOnInit(): void {}

	sendForm() {
		if (!this._form.valid) {
			this.matSnackBar.open('Preencha os dados corretamente', '', {
				duration: 2500
			});
		}
	}
}
