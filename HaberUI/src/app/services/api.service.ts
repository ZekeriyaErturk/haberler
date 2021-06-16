import { Yorum } from './../models/Yorum';
import { Makale } from './../models/Makale';
import { Haber } from './../models/Haber';
import { Kullanici } from './../models/Kullanici';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeoutWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  apiUrl = 'http://localhost:60845/api/';

  constructor(public http: HttpClient) {}

  //#region OturumAçma
  TokenAl(kullaniciAdi: string, kullaniciSifre: string) {
    const data = `username=${kullaniciAdi}&password=${kullaniciSifre}+&grant_type=password`;
    const reqHeader = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlendcoded',
    });
    return this.http.post(this.apiUrl + 'token', data, { headers: reqHeader });
  }
  //#endregion

  //#region Kullanici

  KullaniciListe() {
    return this.http.get(this.apiUrl + 'kullaniciliste');
  }

  KullaniciById(kullaniciId: number) {
    return this.http.get(this.apiUrl + 'kullanicibyid/' + kullaniciId);
  }

  KullaniciEkle(model: Kullanici) {
    model.kullaniciOlusTarih = new Date().toString();
    model.kullaniciRol = 'uye';
    return this.http.post(this.apiUrl + 'kullaniciekle', model);
  }

  KullaniciDuzenle(model: Kullanici) {
    return this.http.put(this.apiUrl + 'kullaniciduzenle', model);
  }

  KullaniciSil(kullaniciId: number) {
    return this.http.delete(this.apiUrl + 'kullanicisil/' + kullaniciId);
  }
  //#endregion

  //#region Haber
  HaberListe() {
    return this.http.get(this.apiUrl + 'haberliste');
  }

  HaberListeById(haberId: number) {
    return this.http.get(this.apiUrl + 'haberlistebyid/' + haberId);
  }

  HaberEkle(haber: Haber) {
    return this.http.post(this.apiUrl + 'haberekle', haber);
  }

  HaberDuzenle(haber: Haber) {
    return this.http.put(this.apiUrl + 'haberduzenle', haber);
  }

  HaberSil(haberId: number) {
    return this.http.delete(this.apiUrl + 'habersil/' + haberId);
  }
  //#endregion

  //#region Makale
  MakaleListe() {
    return this.http.get(this.apiUrl + 'makaleliste');
  }

  MakaleListeByYazarId(yazarId: number) {
    return this.http.get(this.apiUrl + 'makalebyyazarid/' + yazarId);
  }

  MakaleById(makaleId: number) {
    return this.http.get(this.apiUrl + 'makalebyid/' + makaleId);
  }

  MakaleEkle(makale: Makale) {
    return this.http.post(this.apiUrl + 'makaleekle', makale);
  }

  MakaleDuzenle(makale: Makale) {
    return this.http.put(this.apiUrl + 'makaleduzenle', makale);
  }

  MakaleSil(makaleId: number) {
    return this.http.delete(this.apiUrl + 'makalesil/' + makaleId);
  }
  //#endregion

  //#region Yorum
  YorumListe() {
    return this.http.get(this.apiUrl + 'yorumliste');
  }

  YorumByMakale(makaleId: number) {
    return this.http.get(this.apiUrl + 'yorumbymakale/' + makaleId);
  }

  YorumByHaber(haberId: number) {
    return this.http.get(this.apiUrl + 'yorumbyhaber/' + haberId);
  }

  YorumByKullanici(kullaniciId: number) {
    return this.http.get(this.apiUrl + 'yorumbykullanici/' + kullaniciId);
  }

  YorumEkle(yorum: Yorum) {
    return this.http.post(this.apiUrl + 'yorumekle', yorum);
  }

  YorumDuzenle(yorum: Yorum) {
    return this.http.put(this.apiUrl + 'yorumduzenle', yorum);
  }

  YorumSil(yorumId: number) {
    return this.http.delete(this.apiUrl + 'yorumsil/' + yorumId);
  }
  //#endregion
}
