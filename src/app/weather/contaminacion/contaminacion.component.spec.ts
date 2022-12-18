import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaminacionComponent } from './contaminacion.component';

describe('ContaminacionComponent', () => {
  let component: ContaminacionComponent;
  let fixture: ComponentFixture<ContaminacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaminacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaminacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
