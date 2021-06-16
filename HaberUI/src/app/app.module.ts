import { AuthGuard } from './services/auth.guard';
import { AuthInterceptor } from './services/auth.interceptor';
import { ApiService } from './services/api.service';

import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MaterialModule } from './material/material.module';
import { HomeComponent } from './components/home/home.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { MakaleComponent } from './components/makale/makale.component';
import { MakalelerComponent } from './components/makaleler/makaleler.component';
import { HaberComponent } from './components/haber/haber.component';
import { HaberlerComponent } from './components/haberler/haberler.component';
import { YorumComponent } from './components/yorum/yorum.component';
import { KullanicilisteComponent } from './components/kullaniciliste/kullaniciliste.component';
import { KullaniciDialogComponent } from './components/dialogs/kullanici-dialog/kullanici-dialog.component';
import { MakaleDialogComponent } from './components/dialogs/makale-dialog/makale-dialog.component';
import { MakalelisteComponent } from './components/makaleliste/makaleliste.component';
import { HaberlisteComponent } from './components/haberliste/haberliste.component';
import { HaberDialogComponent } from './components/dialogs/haber-dialog/haber-dialog.component';
import { YorumlisteComponent } from './components/yorumliste/yorumliste.component';
import { YorumDialogComponent } from './components/dialogs/yorum-dialog/yorum-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,

    //Dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    LoginComponent,
    RegisterComponent,
    MakaleComponent,
    MakalelerComponent,
    HaberComponent,
    HaberlerComponent,
    YorumComponent,
    KullanicilisteComponent,
    KullaniciDialogComponent,
    MakaleDialogComponent,
    MakalelisteComponent,
    HaberlisteComponent,
    HaberDialogComponent,
    YorumlisteComponent,
    YorumDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  entryComponents: [AlertDialogComponent, ConfirmDialogComponent],
  providers: [
    MyAlertService,
    ApiService,
    AuthGuard,
    AuthInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
