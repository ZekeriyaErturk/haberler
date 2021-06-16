import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from './../../models/Sonuc';
import { ApiService } from './../../services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Kullanici } from './../../models/Kullanici';
import { Component, OnInit, ViewChild } from '@angular/core';
import { KullaniciDialogComponent } from '../dialogs/kullanici-dialog/kullanici-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-kullaniciliste',
  templateUrl: './kullaniciliste.component.html',
  styleUrls: ['./kullaniciliste.component.css'],
})
export class KullanicilisteComponent implements OnInit {
  kullanicilar: Kullanici[];
  dataSource: any;
  dialogRef: MatDialogRef<KullaniciDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns = [
    'kullaniciAdi',
    'kullaniciMail',
    'kullaniciRol',
    'islemler',
  ];

  constructor(
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public apiServis: ApiService
  ) {}

  ngOnInit(): void {
    this.KullaniciListe();
  }

  KullaniciListe() {
    this.apiServis.KullaniciListe().subscribe((res: Kullanici[]) => {
      this.kullanicilar = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    const yeniKayit = new Kullanici();

    this.dialogRef = this.matDialog.open(KullaniciDialogComponent, {
      width: '500px',
      data: {
        kullanici: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.apiServis.KullaniciEkle(res).subscribe((res: Sonuc) => {
          this.alert.AlertUygula(res);
          if (res.islem) {
            this.KullaniciListe();
          }
        });
      }
    });
  }

  Duzenle(kullanici: Kullanici) {
    this.dialogRef = this.matDialog.open(KullaniciDialogComponent, {
      width: '500px',
      data: {
        kullanici: kullanici,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        kullanici.kullaniciAdi = res.KullaniciAdi;
        kullanici.kullaniciMail = res.KullaniciMail;
        kullanici.kullaniciSifre = res.KullaniciSifre;
        console.log(kullanici);
        this.apiServis.KullaniciDuzenle(kullanici).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.KullaniciListe();
          }
        });
      }
    });
  }

  Sil(kullanici: Kullanici) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
    });

    this.dialogRefConfirm.componentInstance.dialogMesaj =
      kullanici.kullaniciAdi + 'silinecektir onaylıyor musunuz?';

    this.dialogRefConfirm.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis
          .KullaniciSil(kullanici.kullaniciId)
          .subscribe((res: Sonuc) => {
            this.alert.AlertUygula(res);
            if (res.islem) {
              this.KullaniciListe();
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
