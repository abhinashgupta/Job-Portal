import { Component } from '@angular/core';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-post-job',
  templateUrl: './post-job.component.html',
  styleUrls: ['./post-job.component.css'],
})
export class PostJobComponent {
  job: Job = {
    id: '',
    title: '',
    company: '',
    location: '',
    postedDate: '',
    description: '',
    requirements: '',
    type: '',
    industry: '',
    recruiterId: '',
  };

  constructor(private jobService: JobService) {}

  postJob() {
    this.jobService.postJob(this.job).subscribe((response) => {
      console.log('Job posted:', response);
    });
  }
}
