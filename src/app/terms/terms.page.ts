import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.page.html',
  styleUrls: ['./terms.page.scss'],
})
export class TermsPage implements OnInit {
  params: Params;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.params = this.route.snapshot.params;
  }
}
