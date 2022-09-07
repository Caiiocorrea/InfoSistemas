import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {
	MatFormFieldModule,
	MAT_FORM_FIELD_DEFAULT_OPTIONS
} from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { NavBarComponent } from 'src/app/components/nav-bar/nav-bar.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { UserAvatarComponent } from 'src/app/components/user-avatar/user-avatar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from 'src/app/interceptor/token.interceptor';

@NgModule({
	declarations: [
		HomeComponent,
		NavBarComponent,
		HeaderComponent,
		UserAvatarComponent,
		DashboardComponent
	],
	imports: [
		CommonModule,
		HomeRoutingModule,
		MatIconModule,
		MatDividerModule,
		MatMenuModule,
		MatListModule,
		MatSidenavModule,
		MatToolbarModule,
		FormsModule,
		MatFormFieldModule
	],
	exports: [NavBarComponent, HeaderComponent, UserAvatarComponent],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
		{
			provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
			useValue: { appearance: 'outline' }
		}
	]
})
export class HomeModule {}
