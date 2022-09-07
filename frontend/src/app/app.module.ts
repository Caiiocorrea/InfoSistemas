import {
	CUSTOM_ELEMENTS_SCHEMA,
	DEFAULT_CURRENCY_CODE,
	LOCALE_ID,
	NgModule
} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './interceptor/token.interceptor';
import { registerLocaleData } from '@angular/common';
import {
	HammerGestureConfig,
	HammerModule,
	HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import * as Hammer from 'hammerjs';

export class MyHammerConfig extends HammerGestureConfig {
	overrides = <any>{
		swipe: { direction: Hammer.DIRECTION_ALL }
	};
}
registerLocaleData(localePt, 'pt');

@NgModule({
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		HammerModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
		{ provide: LOCALE_ID, useValue: 'pt' },
		{
			provide: DEFAULT_CURRENCY_CODE,
			useValue: 'BRL'
		}
	],
	bootstrap: [AppComponent],
	exports: []
})
export class AppModule {}
