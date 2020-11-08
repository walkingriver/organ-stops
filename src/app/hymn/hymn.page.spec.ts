import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HymnPage } from './hymn.page';

describe('HymnPage', () => {
  let component: HymnPage;
  let fixture: ComponentFixture<HymnPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HymnPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HymnPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
