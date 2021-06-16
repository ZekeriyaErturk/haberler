import { Sonuc } from './../../models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from './../../services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MakaleDialogComponent } from '../dialogs/makale-dialog/makale-dialog.component';
import { Makale } from './../../models/Makale';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-makaleliste',
  templateUrl: './makaleliste.component.html',
  styleUrls: ['./makaleliste.component.css'],
})
export class MakalelisteComponent implements OnInit {
  makaleler: Makale[];
  dataSource: any;
  dialogRef: MatDialogRef<MakaleDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  login;
  displayedColumns = [
    'makaleBaslik',
    'makaleIcerik',
    'makaleYazarAdi',
    'islemler',
  ];
  constructor(
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public apiServis: ApiService
  ) {
    this.login = JSON.parse(localStorage.getItem('login'));
  }

  ngOnInit(): void {
    this.MakaleListe();
  }

  MakaleListe() {
    this.apiServis.MakaleListe().subscribe((res: Makale[]) => {
      this.makaleler = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    const yeniKayit = new Makale();

    this.dialogRef = this.matDialog.open(MakaleDialogComponent, {
      width: '1000px',
      data: {
        makale: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((res: Makale) => {
      console.log(res);
      if (res) {
        res.makaleOlusTarih = new Date().toString();
        res.makaleYazarId = this.login.kullaniciId;
        res.makaleYazarAdi = this.login.kullaniciAdi;
        this.apiServis.MakaleEkle(res).subscribe((res: Sonuc) => {
          this.alert.AlertUygula(res);
          if (res.islem) {
            this.MakaleListe();
          }
        });
      }
    });
  }

  Duzenle(makale: Makale) {
    this.dialogRef = this.matDialog.open(MakaleDialogComponent, {
      width: '1000px',
      data: {
        makale: makale,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        makale.makaleBaslik = res.makaleBaslik;
        makale.makaleIcerik = res.makaleIcerik;
        makale.makaleImgUrl = res.makaleImgUrl;
        this.apiServis.MakaleDuzenle(makale).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.MakaleListe();
          }
        });
      }
    });
  }

  Sil(makale: Makale) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
    });

    this.dialogRefConfirm.componentInstance.dialogMesaj =
      makale.makaleBaslik + ' silinecektir onaylıyor musunuz?';

    this.dialogRefConfirm.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.MakaleSil(makale.makaleId).subscribe((res: Sonuc) => {
          this.alert.AlertUygula(res);
          if (res.islem) {
            this.MakaleListe();
          }
        });
      }
    });
  }

  Filtrele(e) {
    const deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
  }
}
