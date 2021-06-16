import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Haber } from './../../../models/Haber';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-haber-dialog',
  templateUrl: './haber-dialog.component.html',
  styleUrls: ['./haber-dialog.component.css'],
})
export class HaberDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Haber;
  frm: FormGroup;
  islem: string;
  constructor(
    public dialogRef: MatDialogRef<HaberDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem === 'ekle') {
      this.dialogBaslik = 'Haber Ekle';
      this.yeniKayit = new Haber();
    }
    if (this.islem === 'duzenle') {
      this.dialogBaslik = 'Haber Duzenle';
      this.yeniKayit = data.haber;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit(): void {}

  FormOlustur() {
    return this.frmBuild.group({
      haberBasligi: [this.yeniKayit.haberBasligi],
      haberIcerik: [this.yeniKayit.haberIcerik],
      haberImgUrl: [this.yeniKayit.haberImgUrl],
    });
  }
}
