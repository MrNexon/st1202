import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { MainComponent } from './pages/main/main.component';
import { BigButtonComponent } from './component/big-button/big-button.component';
import { BigCounterComponent } from './component/big-counter/big-counter.component';
import { SeparatorComponent } from './component/separator/separator.component';
import { CardComponent } from './component/card/card.component';
import { ActionItemComponent } from './component/action-item/action-item.component';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { AngularSvgIconPreloaderModule } from 'angular-svg-icon-preloader';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { OutlineButtonComponent } from './component/outline-button/outline-button.component';
import { CardHeaderComponent } from './component/card-header/card-header.component';
import { ServerCardComponent } from './component/server-card/server-card.component';
import { SocialInfoComponent } from './component/social-info/social-info.component';
import { FooterComponent } from './component/footer/footer.component';
import { PageHeaderComponent } from './component/page-header/page-header.component';
import { LoginComponent } from './pages/login/login.component';
import { FieldComponent } from './component/field/field.component';
import { FieldValidatorComponent } from './component/field-validator/field-validator.component';
import { ButtonComponent } from './component/button/button.component';
import { RegComponent } from './pages/reg/reg.component';
import { LkComponent } from './pages/lk/lk.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtInterceptor } from './api/auth/jwt.interceptor';
import { AdminMainComponent } from './pages/admin-main/admin-main.component';
import { HeaderAdminComponent } from './component/header-admin/header-admin.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { SkinViewerComponent } from './component/skin-viewer/skin-viewer.component';
import { FixedButtonsComponent } from './component/fixed-buttons/fixed-buttons.component';
import { AdminServersComponent } from './pages/admin-servers/admin-severs.component';
import { AdminSocialComponent } from './pages/admin-social/admin-social.component';
import { DialogWindowComponent } from './component/dialog-window/dialog-window.component';
import { AdminLaunchersComponent } from './pages/admin-launchers/admin-launchers.component';
import { DonateComponent } from './pages/donate/donate.component';
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MainComponent,
    BigButtonComponent,
    BigCounterComponent,
    SeparatorComponent,
    CardComponent,
    ActionItemComponent,
    OutlineButtonComponent,
    CardHeaderComponent,
    ServerCardComponent,
    SocialInfoComponent,
    FooterComponent,
    PageHeaderComponent,
    LoginComponent,
    FieldComponent,
    FieldValidatorComponent,
    ButtonComponent,
    RegComponent,
    LkComponent,
    AdminMainComponent,
    HeaderAdminComponent,
    SkinViewerComponent,
    FixedButtonsComponent,
    AdminServersComponent,
    AdminSocialComponent,
    DialogWindowComponent,
    AdminLaunchersComponent,
    DonateComponent,
    ErrorComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    AngularSvgIconModule.forRoot(),
    AngularSvgIconPreloaderModule.forRoot({
      configUrl: './assets/images/svg/icons.json',
    }),
    FormsModule,
    ReactiveFormsModule,
    RecaptchaV3Module,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: '6Lct68saAAAAAD6ezy8sjdJtWpByTgi3DnAb0irO',
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
