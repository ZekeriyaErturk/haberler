import { Makale } from './../../../models/Makale';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-makale-dialog',
  templateUrl: './makale-dialog.component.html',
  styleUrls: ['./makale-dialog.component.css'],
})
export class MakaleDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Makale;
  frm: FormGroup;
  islem: string;
  constructor(
    public dialogRef: MatDialogRef<MakaleDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    if (this.islem === 'ekle') {
      this.dialogBaslik = 'Makale Ekle';
      this.yeniKayit = new Makale();
    }
    if (this.islem === 'duzenle') {
      this.dialogBaslik = 'Makale Duzenle';
      this.yeniKayit = data.makale;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit(): void {}

  FormOlustur() {
    return this.frmBuild.group({
      makaleBaslik: [this.yeniKayit.makaleBaslik],
      makaleIcerik: [this.yeniKayit.makaleIcerik],
      makaleImgUrl: [this.yeniKayit.makaleImgUrl],
    });
  }
}
