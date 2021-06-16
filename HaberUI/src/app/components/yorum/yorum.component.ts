import { MyAlertService } from './../../services/myAlert.service';
import { Sonuc } from './../../models/Sonuc';
import { Yorum } from './../../models/Yorum';
import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-yorum',
  templateUrl: './yorum.component.html',
  styleUrls: ['./yorum.component.css'],
})
export class YorumComponent implements OnInit {
  type: string;
  typeId: number;
  yorumlar: Yorum[];
  yorumIcerik: string;
  login: boolean;
  constructor(
    public route: ActivatedRoute,
    public apiServis: ApiService,
    public alert: MyAlertService
  ) {}

  ngOnInit(): void {
    this.route.url.subscribe((p) => {
      this.type = p[0].path;
      this.typeId = +p[1].path;
    });
    this.YorumListele();
    if (localStorage.getItem('login')) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  YorumListele() {
    if (this.type !== 'haber') {
      this.apiServis.YorumByMakale(this.typeId).subscribe((res: Yorum[]) => {
        this.yorumlar = res;
      });
    } else {
      this.apiServis.YorumByHaber(this.typeId).subscribe((res: Yorum[]) => {
        this.yorumlar = res;
        console.log(this.yorumlar);
      });
    }
  }

  YorumYap() {
    if (!this.login) {
      const s = new Sonuc();
      s.islem = false;
      s.mesaj = 'Yorum Yapabilmek İçin Giriş Yapmalısınız';
      this.alert.AlertUygula(s);
      return;
    }

    const login = JSON.parse(localStorage.getItem('login'));
    const yorum = new Yorum();
    yorum.yorumDuzTarih = new Date().toString();
    yorum.yorumOlusTarih = new Date().toString();
    yorum.yorumLike = 0;
    yorum.yorumIcerik = this.yorumIcerik;
    yorum.yorumKullaniciId = login.kullaniciId;
    yorum.yorumKullaniciAdi = login.kullaniciAdı;
    if (this.type === 'haber') {
      yorum.yorumHaberId = this.typeId;
    } else {
      yorum.yorumMakaleId = this.typeId;
    }

    this.apiServis.YorumEkle(yorum).subscribe((res) => {
      this.YorumListele();
    });
  }

  YorumLike(yorum: Yorum) {
    if (!this.login) {
      const s = new Sonuc();
      s.islem = false;
      s.mesaj = 'Beğeni Yapabilmek İçin Giriş Yapmalısınız';
      this.alert.AlertUygula(s);
      return;
    }
    yorum.yorumLike = yorum.yorumLike + 1;
    this.apiServis.YorumDuzenle(yorum).subscribe((res) => {
      console.log(res);
    });
  }
}
