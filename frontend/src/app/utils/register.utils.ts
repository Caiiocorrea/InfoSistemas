import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const EMAIL_PATTERN = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

export const matchFields =
	(field1: string, field2: string): ValidatorFn =>
	(controls: AbstractControl): ValidationErrors | null => {
		let control1 = controls.get(field1);
		let control2 = controls.get(field2);
		if (control2?.errors && !control2?.errors.matching) {
			return null;
		}
		if (control1?.value !== control2?.value) {
			controls.get(field2)?.setErrors({ matching: true });
			return { matching: true };
		}
		return null;
	};
