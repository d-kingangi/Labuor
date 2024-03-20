import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TalentDashComponent } from './talent-dash.component';

describe('TalentDashComponent', () => {
  let component: TalentDashComponent;
  let fixture: ComponentFixture<TalentDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TalentDashComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TalentDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
