import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './account/login/login.component';
import { CreateAccountComponent } from './account/create-account/create-account.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { CreateHangoutComponent } from './hangout/create-hangout/create-hangout.component';

import { AuthGuard } from './shared/auth.guard';
import { AuthInterceptor } from './shared/authconfig.interceptor';
import { HangoutComponent } from './hangout/hangout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CreateAccountComponent,
    HomeComponent,
    NavbarComponent,
    CreateHangoutComponent,
    HangoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'home', pathMatch: 'full' },
      {path: 'login', component: LoginComponent, data: {navbar: false}},
      {path: 'account/create', component: CreateAccountComponent, canActivate: [AuthGuard], data: {navbar: true}},
      {path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: {navbar: true}},
      {path: 'hangout/home', component: HangoutComponent, canActivate: [AuthGuard], data: {navbar: true}},
      {path: 'hangout/create', component: CreateHangoutComponent, canActivate: [AuthGuard], data: {navbar: true}},
    ]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
