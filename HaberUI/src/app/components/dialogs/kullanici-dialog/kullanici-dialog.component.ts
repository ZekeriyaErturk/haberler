import { Kullanici } from './../../../models/Kullanici';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-kullanici-dialog',
  templateUrl: './kullanici-dialog.component.html',
  styleUrls: ['./kullanici-dialog.component.css'],
})
export class KullaniciDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Kullanici;
  frm: FormGroup;
  islem: string;
  constructor(
    public dialogRef: MatDialogRef<KullaniciDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem === 'ekle') {
      this.dialogBaslik = 'Kullanici Ekle';
      this.yeniKayit = new Kullanici();
    }
    if (this.islem === 'duzenle') {
      this.dialogBaslik = 'Kullanici Duzenle';
      this.yeniKayit = data.kullanici;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit(): void {}

  FormOlustur() {
    return this.frmBuild.group({
      KullaniciAdi: [this.yeniKayit.kullaniciAdi],
      KullaniciMail: [this.yeniKayit.kullaniciMail],
      KullaniciSifre: [this.yeniKayit.kullaniciSifre],
    });
  }
}
