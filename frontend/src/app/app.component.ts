import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TalentRegistrationComponent } from './Components/talent-registration/talent-registration.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TalentRegistrationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Labour';
}
