import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'
import { LandingComponent } from './Components/landing/landing.component';
import { TalentRegistrationComponent } from './Components/talent-registration/talent-registration.component';
import { LoginComponent } from './Components/login/login.component';
import { EmployerRegistrationComponent } from './Components/employer-registration/employer-registration.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';


export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: '/talent-registration', component: TalentRegistrationComponent},
    {path: '/employer-registration', component: EmployerRegistrationComponent},
    {path: '/login', component: LoginComponent},
    { path: '**', component: NotFoundComponent},
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
