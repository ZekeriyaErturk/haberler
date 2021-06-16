import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Yorum } from './../../../models/Yorum';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-yorum-dialog',
  templateUrl: './yorum-dialog.component.html',
  styleUrls: ['./yorum-dialog.component.css'],
})
export class YorumDialogComponent implements OnInit {
  dialogBaslik: string;
  yeniKayit: Yorum;
  frm: FormGroup;
  islem: string;
  constructor(
    public dialogRef: MatDialogRef<YorumDialogComponent>,
    public frmBuild: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.islem = data.islem;

    this.dialogBaslik = 'Yorum Duzenle';
    this.yeniKayit = data.yorum;
    this.frm = this.FormOlustur();
  }

  ngOnInit(): void {}

  FormOlustur() {
    return this.frmBuild.group({
      yorumIcerik: [this.yeniKayit.yorumIcerik],
    });
  }
}
