import { ApiService } from './../../services/api.service';
import { Haber } from './../../models/Haber';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-haber',
  templateUrl: './haber.component.html',
  styleUrls: ['./haber.component.css'],
})
export class HaberComponent implements OnInit {
  haberId: number;
  haber: Haber;
  constructor(public route: ActivatedRoute, public apiServis: ApiService) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      this.haberId = res.id;
    });
    this.HaberGetir();
  }

  HaberGetir() {
    return this.apiServis
      .HaberListeById(this.haberId)
      .subscribe((res: Haber) => {
        this.haber = res;
      });
  }
}
