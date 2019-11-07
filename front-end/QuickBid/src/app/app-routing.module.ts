import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AdminComponent } from './admin/admin.component';
import { ViewProfileComponent } from './home/view-profile/view-profile.component';
import { ViewItemsComponent } from './admin/view-items/view-items.component';
import { ViewUsersComponent } from './admin/view-users/view-users.component';
import { ViewStatsComponent } from './admin/view-stats/view-stats.component';
import { BuyComponent } from './home/buy/buy.component';
import { SellComponent } from './home/sell/sell.component';
import { ForgotPwComponent } from './forgot-pw/forgot-pw.component';

const routes: Routes = [

  { path:'', redirectTo: 'login', pathMatch: 'full' },
  { path:'home', redirectTo: 'home/buy', pathMatch: 'full' },
  { path:'admin', redirectTo: 'admin/viewStats', pathMatch: 'full' },

  { path:'login',component:LoginComponent },
  { path:'register',component:RegisterComponent },
  { path:'forgotPw',component:ForgotPwComponent },
  { path:'home',component:HomeComponent,
    children:[
      { path:'buy',component:BuyComponent },
      { path:'sell',component:SellComponent },
      { path:'viewProfile',component:ViewProfileComponent }
    ]
  },
  { path:'admin',component:AdminComponent,
    children:[
      { path:'viewStats',component:ViewStatsComponent },
      { path:'viewUsers',component:ViewUsersComponent },
      { path:'viewItems',component:ViewItemsComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
