import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { ViewProfileComponent } from './home/view-profile/view-profile.component';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { ViewItemsComponent } from './admin/view-items/view-items.component';
import { ViewStatsComponent } from './admin/view-stats/view-stats.component';
import { BuyComponent } from './home/buy/buy.component';
import { SellComponent } from './home/sell/sell.component';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    ViewProfileComponent,
    ViewUsersComponent,
    ViewItemsComponent,
    ViewStatsComponent,
    BuyComponent,
    SellComponent,
    ForgotPwComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
