// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';
import { JobListingComponent } from './components/job-listing/job-listing.component';
import { RecruiterDashboardComponent } from './components/recruiter-dashboard/recruiter-dashboard.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { RecruiterProfileComponent } from './components/recruiter-profile/recruiter-profile.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
    data: { role: 'jobseeker' },
  },
  {
    path: 'recruiter-dashboard',
    component: RecruiterDashboardComponent,
    canActivate: [AuthGuard],
    data: { role: 'recruiter' },
  },
  {
    path: 'recruiter-profile',
    component: RecruiterProfileComponent,
    canActivate: [AuthGuard],
    data: { role: 'recruiter' },
  },
  {
    path: 'post-job',
    component: PostJobComponent,
    canActivate: [AuthGuard],
    data: { role: 'recruiter' },
  },
  
  {
    path: 'job-listings',
    component: JobListingComponent,
    canActivate: [AuthGuard],
    data: { role: 'jobseeker' },
  },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: '**', redirectTo: '/login' },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
