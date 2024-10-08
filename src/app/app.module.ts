import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthModule } from './features/auth/auth.module';
import { CoreModule } from './core/core.module';
import { MainLayoutModule } from './features/main-layout/main-layout.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    AuthModule,
    MainLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent, CoreModule]
})
export class AppModule { }
