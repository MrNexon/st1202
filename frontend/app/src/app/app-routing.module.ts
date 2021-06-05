import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { LoginComponent } from './pages/login/login.component';
import { RegComponent } from './pages/reg/reg.component';
import { LkComponent } from './pages/lk/lk.component';
import { AdminMainComponent } from './pages/admin-main/admin-main.component';
import { AdminServersComponent } from './pages/admin-servers/admin-severs.component';
import { AdminSocialComponent } from './pages/admin-social/admin-social.component';
import { AdminLaunchersComponent } from './pages/admin-launchers/admin-launchers.component';
import { DonateComponent } from './pages/donate/donate.component';
import { ErrorComponent } from './pages/error/error.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'reg',
    component: RegComponent,
  },
  {
    path: 'lk',
    component: LkComponent,
  },
  {
    path: 'donate',
    component: DonateComponent,
  },
  {
    path: 'admin/main',
    component: AdminMainComponent,
  },
  {
    path: 'admin/servers',
    component: AdminServersComponent,
  },
  {
    path: 'admin/social',
    component: AdminSocialComponent,
  },
  {
    path: 'admin/launchers',
    component: AdminLaunchersComponent,
  },
  { path: '404', component: ErrorComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
