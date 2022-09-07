import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { FabButtonMenuComponent } from './fab-button-menu/fab-button-menu.component';
import { PaginatorComponent } from './paginator/paginator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
	declarations: [
		ErrorMessageComponent,
		FabButtonMenuComponent,
		PaginatorComponent
	],
	imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
	exports: [ErrorMessageComponent, FabButtonMenuComponent, PaginatorComponent]
})
export class ComponentsModule {}
