import { ApiService } from './../../services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Makale } from './../../models/Makale';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-makale',
  templateUrl: './makale.component.html',
  styleUrls: ['./makale.component.css'],
})
export class MakaleComponent implements OnInit {
  makaleId: number;
  makale: Makale;
  constructor(public route: ActivatedRoute, public apiServis: ApiService) {}

  ngOnInit(): void {
    this.MakaleListe();
  }

  MakaleListe() {
    this.route.params.subscribe((d) => {
      this.makaleId = d.id;
      this.apiServis.MakaleById(this.makaleId).subscribe((res: Makale) => {
        this.makale = res;
      });
    });
  }
}
