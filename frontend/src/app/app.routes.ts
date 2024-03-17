import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core'
import { LandingComponent } from './Components/landing/landing.component';
import { TalentRegistrationComponent } from './Components/talent-registration/talent-registration.component';
import { LoginComponent } from './Components/login/login.component';
import { EmployerRegistrationComponent } from './Components/employer-registration/employer-registration.component';
import { NotFoundComponent } from './Components/not-found/not-found.component';
import { TalentProfileComponent } from './Components/talent-profile/talent-profile.component';
import { EmployersComponent } from './Components/employers/employers.component';
import { TalentsComponent } from './Components/talents/talents.component';
import { EmployerProfileComponent } from './Components/employer-profile/employer-profile.component';
import { JobInfoComponent } from './Components/job-info/job-info.component';
import { JobsComponent } from './Components/jobs/jobs.component';
// import { ChatsComponent } from './Components/chats/chats.component';


export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'talent-registration', component: TalentRegistrationComponent},
    {path: 'employer-registration', component: EmployerRegistrationComponent},
    {path: 'login', component: LoginComponent},
    { path: 'employers', component: EmployersComponent},
    { path: 'talents', component: TalentsComponent},
    { path: 'talent-profile/:talentId', component: TalentProfileComponent},
    {path: 'employer-profile/:employerId', component: EmployerProfileComponent},
    {path: 'job-info', component: JobInfoComponent},
    {path: 'jobs', component: JobsComponent},
    // {path: 'chats', component: ChatsComponent},
    { path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
