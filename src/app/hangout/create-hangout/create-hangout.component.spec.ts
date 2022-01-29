import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateHangoutComponent } from './create-hangout.component';

describe('CreateHangoutComponent', () => {
  let component: CreateHangoutComponent;
  let fixture: ComponentFixture<CreateHangoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateHangoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateHangoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
