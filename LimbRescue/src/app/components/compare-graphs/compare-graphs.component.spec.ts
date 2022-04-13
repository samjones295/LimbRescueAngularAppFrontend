import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareGraphsComponent } from './compare-graphs.component';

describe('CompareGraphsComponent', () => {
  let component: CompareGraphsComponent;
  let fixture: ComponentFixture<CompareGraphsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompareGraphsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompareGraphsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
