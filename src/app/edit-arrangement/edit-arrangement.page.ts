import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Arrangement, Hymn } from '../hymn';

@Component({
  selector: 'app-edit-arrangement',
  templateUrl: './edit-arrangement.page.html',
  styleUrls: ['./edit-arrangement.page.scss'],
})
export class EditArrangementPage implements OnInit {
  @Input() hymn: Hymn;
  @Input() arrangement: Arrangement;
  readonly: boolean;

  constructor(private modalController: ModalController) {}

  ngOnInit() {
    this.readonly = !!this.hymn.title;
  }

  cancel() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss({
      hymn: this.hymn,
      arrangement: this.arrangement,
    });
  }
}
