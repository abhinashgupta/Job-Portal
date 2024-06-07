import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { JobListingComponent } from './components/job-listing/job-listing.component';
import { RecruiterDashboardComponent } from './components/recruiter-dashboard/recruiter-dashboard.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { PostJobComponent } from './components/post-job/post-job.component';
import { RecruiterProfileComponent } from './components/recruiter-profile/recruiter-profile.component';


@NgModule({
  declarations: [AppComponent, UserProfileComponent,LoginComponent,RegisterComponent,JobListingComponent, RecruiterDashboardComponent, AccessDeniedComponent, PostJobComponent, RecruiterProfileComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
