import { Makale } from './../../models/Makale';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-makaleler',
  templateUrl: './makaleler.component.html',
  styleUrls: ['./makaleler.component.css'],
})
export class MakalelerComponent implements OnInit {
  makaleler: Makale[];
  search: string;
  filtered: Makale[];
  constructor(public apiServis: ApiService) {}

  ngOnInit(): void {
    this.MakaleListe();
  }

  MakaleListe() {
    this.apiServis.MakaleListe().subscribe((res: Makale[]) => {
      this.makaleler = res;
      this.filtered = res;
    });
  }

  Search() {
    this.filtered = this.makaleler.filter((m) =>
      m.makaleBaslik.includes(this.search)
    );
  }
}
