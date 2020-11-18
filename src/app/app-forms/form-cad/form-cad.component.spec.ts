import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { FormCadComponent } from './form-cad.component';

describe('FormCadComponent', () => {
  let component: FormCadComponent;
  let fixture: ComponentFixture<FormCadComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
