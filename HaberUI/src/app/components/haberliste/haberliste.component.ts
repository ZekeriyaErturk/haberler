import { HaberDialogComponent } from './../dialogs/haber-dialog/haber-dialog.component';
import { Haber } from './../../models/Haber';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-haberliste',
  templateUrl: './haberliste.component.html',
  styleUrls: ['./haberliste.component.css'],
})
export class HaberlisteComponent implements OnInit {
  haberler: Haber[];
  dataSource: any;
  dialogRef: MatDialogRef<HaberDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  login;
  displayedColumns = ['haberBasligi', 'haberIcerik', 'islemler'];
  constructor(
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public apiServis: ApiService
  ) {
    this.login = JSON.parse(localStorage.getItem('login'));
  }

  ngOnInit(): void {
    this.HaberListe();
  }

  HaberListe() {
    this.apiServis.HaberListe().subscribe((res: Haber[]) => {
      this.haberler = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Ekle() {
    const yeniKayit = new Haber();

    this.dialogRef = this.matDialog.open(HaberDialogComponent, {
      width: '1000px',
      data: {
        makale: yeniKayit,
        islem: 'ekle',
      },
    });
    this.dialogRef.afterClosed().subscribe((res: Haber) => {
      console.log(res);
      if (res) {
        res.haberOlusTarih = new Date().toString();
        this.apiServis.HaberEkle(res).subscribe((res: Sonuc) => {
          this.alert.AlertUygula(res);
          if (res.islem) {
            this.HaberListe();
          }
        });
      }
    });
  }

  Duzenle(haber: Haber) {
    this.dialogRef = this.matDialog.open(HaberDialogComponent, {
      width: '1000px',
      data: {
        haber: haber,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        haber.haberBasligi = res.haberBasligi;
        haber.haberIcerik = res.haberIcerik;
        haber.haberImgUrl = res.haberImgUrl;
        this.apiServis.HaberDuzenle(haber).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.HaberListe();
          }
        });
      }
    });
  }

  Sil(haber: Haber) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
    });

    this.dialogRefConfirm.componentInstance.dialogMesaj =
      haber.haberBasligi + ' silinecektir onaylıyor musunuz?';

    this.dialogRefConfirm.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.MakaleSil(haber.haberId).subscribe((res: Sonuc) => {
          this.alert.AlertUygula(res);
          if (res.islem) {
            this.HaberListe();
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
