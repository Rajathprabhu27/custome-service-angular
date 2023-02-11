import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowSnackBarComponent } from './show-snack-bar.component';

describe('ShowSnackBarComponent', () => {
  let component: ShowSnackBarComponent;
  let fixture: ComponentFixture<ShowSnackBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowSnackBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
