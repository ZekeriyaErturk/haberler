import { AuthGuard } from './services/auth.guard';
import { YorumlisteComponent } from './components/yorumliste/yorumliste.component';
import { HaberlisteComponent } from './components/haberliste/haberliste.component';
import { MakalelisteComponent } from './components/makaleliste/makaleliste.component';
import { KullanicilisteComponent } from './components/kullaniciliste/kullaniciliste.component';
import { MakaleComponent } from './components/makale/makale.component';
import { HaberComponent } from './components/haber/haber.component';
import { MakalelerComponent } from './components/makaleler/makaleler.component';
import { HaberlerComponent } from './components/haberler/haberler.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'haberler',
    component: HaberlerComponent,
  },
  {
    path: 'makaleler',
    component: MakalelerComponent,
    canActivate: [AuthGuard],
    data: {
      roller: ['uye', 'admin', 'yazar'],
    },
  },
  {
    path: 'haber/:id',
    component: HaberComponent,
  },
  {
    path: 'makale/:id',
    component: MakaleComponent,
    canActivate: [AuthGuard],
    data: {
      roller: ['uye', 'admin', 'yazar'],
    },
  },
  {
    path: 'kullaniciliste',
    component: KullanicilisteComponent,
    canActivate: [AuthGuard],
    data: {
      roller: ['admin'],
    },
  },
  {
    path: 'makaleliste',
    component: MakalelisteComponent,
    canActivate: [AuthGuard],
    data: {
      roller: ['admin'],
    },
  },
  {
    path: 'haberliste',
    component: HaberlisteComponent,
    canActivate: [AuthGuard],
    data: {
      roller: ['admin'],
    },
  },
  {
    path: 'yorumliste',
    component: YorumlisteComponent,
    canActivate: [AuthGuard],
    data: {
      roller: ['admin'],
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
