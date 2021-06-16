import { Sonuc } from './../../models/Sonuc';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from './../../services/myAlert.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Yorum } from './../../models/Yorum';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit, resolveForwardRef, ViewChild } from '@angular/core';
import { YorumDialogComponent } from '../dialogs/yorum-dialog/yorum-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-yorumliste',
  templateUrl: './yorumliste.component.html',
  styleUrls: ['./yorumliste.component.css'],
})
export class YorumlisteComponent implements OnInit {
  yorumlar: Yorum[];
  dataSource: any;
  dialogRef: MatDialogRef<YorumDialogComponent>;
  dialogRefConfirm: MatDialogRef<ConfirmDialogComponent>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  login;
  displayedColumns = [
    'yorumIcerik',
    'yorumKullaniciAdi',
    'yorumHaberId',
    'yorumMakaleId',
    'islemler',
  ];
  constructor(
    public matDialog: MatDialog,
    public alert: MyAlertService,
    public apiServis: ApiService
  ) {}

  ngOnInit(): void {
    this.YorumListe();
  }

  YorumListe() {
    this.apiServis.YorumListe().subscribe((res: Yorum[]) => {
      this.yorumlar = res;
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  Duzenle(yorum: Yorum) {
    this.dialogRef = this.matDialog.open(YorumDialogComponent, {
      width: '700px',
      data: {
        yorum: yorum,
        islem: 'duzenle',
      },
    });

    this.dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        yorum.yorumIcerik = res.yorumIcerik;
        this.apiServis.YorumDuzenle(yorum).subscribe((s: Sonuc) => {
          this.alert.AlertUygula(s);
          if (s.islem) {
            this.YorumListe();
          }
        });
      }
    });
  }

  Sil(yorum: Yorum) {
    this.dialogRefConfirm = this.matDialog.open(ConfirmDialogComponent, {
      width: '500px',
    });

    this.dialogRefConfirm.componentInstance.dialogMesaj =
      yorum.yorumIcerik + ' silinecektir onaylıyor musunuz?';

    this.dialogRefConfirm.afterClosed().subscribe((d) => {
      if (d) {
        this.apiServis.YorumSil(yorum.yorumId).subscribe((res: Sonuc) => {
          this.alert.AlertUygula(res);
          if (res.islem) {
            this.YorumListe();
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
