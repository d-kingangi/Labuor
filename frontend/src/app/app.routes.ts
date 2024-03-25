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
import { ChatsComponent } from './Components/chats/chats.component';
import { TalentDashComponent } from './Components/talent-dash/talent-dash.component';
import { EmployerDashComponent } from './Components/employer-dash/employer-dash.component';
import { PostJobComponent } from './Components/post-job/post-job.component';
import { RegistrationComponent } from './Components/registration/registration.component';


export const routes: Routes = [
    {path: '', component: LandingComponent},
    {path: 'talent-registration', component: TalentRegistrationComponent},
    {path: 'employer-registration', component: EmployerRegistrationComponent},
    {path: 'login', component: LoginComponent},
    {path: 'employers', component: EmployersComponent},
    {path: 'talents', component: TalentsComponent},
    {path: 'registration', component: RegistrationComponent},
    {path: 'jobs', component: JobsComponent},
    {path: 'talent-profile/:talentId', component: TalentProfileComponent},
    {path: 'employer-profile/:employerId', component: EmployerProfileComponent},
    {path: 'job-info/:jobId', component: JobInfoComponent},
    {path: 'talent-dashboard/:talentId', component: TalentDashComponent},
    {path: 'employer-dashboard/:employerId', component: EmployerDashComponent},
    {path: 'chats/:orgId', component: ChatsComponent},
    {path: 'post-job', component: PostJobComponent},
    { path: '**', component: NotFoundComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }
