import { MyAlertService } from './../../services/myAlert.service';
import { Sonuc } from './../../models/Sonuc';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  constructor(public apiServis: ApiService, public alert: MyAlertService) {}

  ngOnInit(): void {}

  OturumAc(kullaniciAdi, kullaniciSifre) {
    const s: Sonuc = new Sonuc();
    if (kullaniciAdi === '' || kullaniciSifre === '') {
      s.islem = false;
      s.mesaj = 'Kullanici adı veya Parola Geçersiz';
      this.alert.AlertUygula(s);
      return;
    }

    this.apiServis.TokenAl(kullaniciAdi, kullaniciSifre).subscribe(
      (res) => {
        localStorage.setItem('login', JSON.stringify(res));
        location.href = '/';
      },
      (err) => {
        console.log(err);
        s.islem = false;
        s.mesaj = 'Kullanici Adi veya Parola Geçersizdir';
        this.alert.AlertUygula(s);
      }
    );
  }
}
