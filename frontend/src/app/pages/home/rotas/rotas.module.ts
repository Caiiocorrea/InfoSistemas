import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RotasRoutingModule } from './rotas-routing.module';
import { RotasComponent } from './rotas.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MatCardModule } from '@angular/material/card';
import { AddRotaComponent } from './add-rota/add-rota.component';
import { MatStepperModule } from '@angular/material/stepper';
import {
	MatProgressSpinnerModule,
	MatSpinner
} from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CarregamentoComponent } from './carregamento/carregamento.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { DetalhesRotaComponent } from './detalhes-rota/detalhes-rota.component';
import {
	HammerGestureConfig,
	HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';

export class MyHammerConfig extends HammerGestureConfig {
	overrides = <any>{
		swipe: [{ direction: Hammer.DIRECTION_HORIZONTAL }]
	};
}
@NgModule({
	declarations: [
		RotasComponent,
		AddRotaComponent,
		CarregamentoComponent,
		DetalhesRotaComponent
	],
	imports: [
		CommonModule,
		RotasRoutingModule,
		MatExpansionModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		DragDropModule,
		MatDialogModule,
		MatSnackBarModule,
		ReactiveFormsModule,
		InfiniteScrollModule,
		MatCardModule,
		MatStepperModule,
		MatProgressSpinnerModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatAutocompleteModule,
		MatChipsModule
	],
	providers: [{ provide: HAMMER_GESTURE_CONFIG, useClass: MyHammerConfig }]
})
export class RotasModule {}
