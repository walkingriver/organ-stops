import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditArrangementPage } from './edit-arrangement.page';

describe('EditArrangementPage', () => {
  let component: EditArrangementPage;
  let fixture: ComponentFixture<EditArrangementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditArrangementPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditArrangementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
