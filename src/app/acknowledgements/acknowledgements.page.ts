import { Component } from '@angular/core';
import { License } from '../license';
import licenses from 'src/assets/licenses.json';

@Component({
  selector: 'app-acknowledgements',
  templateUrl: './acknowledgements.page.html',
  styleUrls: ['./acknowledgements.page.scss'],
})
export class AcknowledgementsPage {
  licenses: { [name: string]: License } = licenses;
}
