import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Arrangement } from '../hymn';

@Component({
  selector: 'app-edit-arrangement',
  templateUrl: './edit-arrangement.page.html',
  styleUrls: ['./edit-arrangement.page.scss'],
})
export class EditArrangementPage implements OnInit {
  @Input() arrangement: Arrangement;

  constructor(private modalController: ModalController) {}

  ngOnInit() {}

  cancel() {
    this.modalController.dismiss();
  }

  save() {
    this.modalController.dismiss(this.arrangement);
  }
}
