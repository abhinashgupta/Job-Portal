import { Component, OnInit } from '@angular/core';
import { JobSeekerService } from '../../services/job-seeker.service';

@Component({
  selector: 'app-recruiter-profile',
  templateUrl: './recruiter-profile.component.html',
  styleUrls: ['./recruiter-profile.component.css'],
})
export class RecruiterProfileComponent implements OnInit {
  searchCriteria: any = {
    skills: '',
    experience: '',
    education: '',
  };
  jobSeekerProfiles: any[] = [];
  error: string | null = null;

  constructor(private jobSeekerService: JobSeekerService) {}

  ngOnInit(): void {
    this.loadJobSeekerProfiles();
  }

  loadJobSeekerProfiles() {
    this.jobSeekerService.loadJobSeekerProfiles().subscribe(
      (data: any) => {
        this.jobSeekerProfiles = data;
      },
      (error: any) => {
        this.error = 'Failed to fetch job seeker profiles.';
      }
    );
  }

  searchJobSeekers(): void {
    this.jobSeekerService.searchProfiles(this.searchCriteria).subscribe(
      (data: any) => {
        this.jobSeekerProfiles = data;
        this.error = null;
      },
      (error: any) => {
        this.error = 'Failed to fetch job seeker profiles.';
        this.jobSeekerProfiles = [];
      }
    );
  }
}
