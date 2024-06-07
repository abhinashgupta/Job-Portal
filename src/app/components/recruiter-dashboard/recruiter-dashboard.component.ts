import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recruiter-dashboard',
  templateUrl: './recruiter-dashboard.component.html',
  styleUrls: ['./recruiter-dashboard.component.css'],
})
export class RecruiterDashboardComponent implements OnInit {
  jobListings: any[] = [];
  newJob = {
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    type: '',
    industry: '',
    postedDate: '',
    recruiterId: null,
  };
  error: string | null = null;

  constructor(
    private jobService: JobService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.id) {
      this.newJob.recruiterId = currentUser.id;
      this.loadJobListings();
    } else {
      this.error = 'Failed to retrieve recruiter information.';
    }
  }

  loadJobListings(): void {
    if (this.newJob.recruiterId) {
      this.jobService
        .getJobListingsByRecruiter(this.newJob.recruiterId)
        .subscribe(
          (data: any) => {
            this.jobListings = [data];
          },
          (error: any) => {
            this.error = 'Failed to load job listings.';
          }
        );
    }
  }

  postJob(): void {
    if (this.newJob.recruiterId) {
      this.newJob.postedDate = new Date().toISOString().split('T')[0];
      this.jobService.postJob(this.newJob).subscribe(
        (response: any) => {
          this.jobListings.push(response);
          this.resetNewJobForm();
        },
        (error: any) => {
          this.error = 'Failed to post job.';
        }
      );
    } else {
      this.error = 'Recruiter information is missing. Unable to post job.';
    }
  }

  resetNewJobForm(): void {
    this.newJob = {
      title: '',
      company: '',
      location: '',
      description: '',
      requirements: '',
      type: '',
      industry: '',
      postedDate: '',
      recruiterId: this.newJob.recruiterId,
    };
  }
}
