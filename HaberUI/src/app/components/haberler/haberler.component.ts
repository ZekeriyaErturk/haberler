import { ApiService } from './../../services/api.service';
import { Haber } from './../../models/Haber';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-haberler',
  templateUrl: './haberler.component.html',
  styleUrls: ['./haberler.component.css'],
})
export class HaberlerComponent implements OnInit {
  haberler: Haber[];
  search: string;
  filtered: Haber[];
  constructor(public apiServis: ApiService) {}

  ngOnInit(): void {
    this.HaberListe();
  }

  HaberListe() {
    this.apiServis.HaberListe().subscribe((res: Haber[]) => {
      this.haberler = res;
      this.filtered = res;
    });
  }

  Search() {
    this.filtered = this.haberler.filter((h) =>
      h.haberBasligi.toLowerCase().includes(this.search.toLowerCase())
    );
  }
}
