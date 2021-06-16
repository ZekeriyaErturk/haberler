import { ApiService } from './../../services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { MatMenuModule } from '@angular/material/menu';
import { Sonuc } from './../../models/Sonuc';
import { Kullanici } from './../../models/Kullanici';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(public alsert: MyAlertService, public apiServis: ApiService) {}

  ngOnInit(): void {}

  KullaniciOlustur(
    kullaniciAdi,
    kullaniciMail,
    kullaniciSifre,
    kullaniciSifreTekrar
  ) {
    const sonuc = new Sonuc();
    if (
      kullaniciSifre !== kullaniciSifreTekrar ||
      kullaniciAdi === '' ||
      kullaniciMail === ''
    ) {
      sonuc.islem = false;
      sonuc.mesaj = 'Kullanici Adi veya Sifre Geçersiz';
      this.alsert.AlertUygula(sonuc);
      return;
    }

    const kullanici = new Kullanici();
    kullanici.kullaniciAdi = kullaniciAdi;
    kullanici.kullaniciSifre = kullaniciSifre;
    kullanici.kullaniciMail = kullaniciMail;
    this.apiServis.KullaniciEkle(kullanici).subscribe(
      (res: Sonuc) => {
        if (res.islem) {
          this.apiServis
            .TokenAl(kullanici.kullaniciAdi, kullanici.kullaniciSifre)
            .subscribe((res) => {
              localStorage.setItem('login', JSON.stringify(res));
              location.href = '/';
            });
        }
      },
      (err) => {
        sonuc.islem = false;
        sonuc.mesaj = 'Bir hata Oluştu';
        this.alsert.AlertUygula(sonuc);
      }
    );
  }
}
