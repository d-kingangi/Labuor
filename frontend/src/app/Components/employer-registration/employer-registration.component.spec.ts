import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerRegistrationComponent } from './employer-registration.component';

describe('EmployerRegistrationComponent', () => {
  let component: EmployerRegistrationComponent;
  let fixture: ComponentFixture<EmployerRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployerRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmployerRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
