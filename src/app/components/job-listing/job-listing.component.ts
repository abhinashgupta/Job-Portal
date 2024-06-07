import { Component, OnInit } from '@angular/core';
import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-job-listings',
  templateUrl: './job-listing.component.html',
  styleUrls: ['./job-listing.component.css'],
})
export class JobListingComponent implements OnInit {
  jobListings: any[] = [];
  filteredJobListings: any[] = [];

  searchKeyword: string = '';
  searchLocation: string = '';
  searchIndustry: string = '';
  searchType: string = '';

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    this.loadJobListings();
  }

  loadJobListings(): void {
    this.jobService.getAllJobListings().subscribe(
      (data: any) => {
        this.jobListings = data;
        this.filteredJobListings = data;
      },
      (error: any) => {
      }
    );
  }

  filterJobListings(): void {
    this.filteredJobListings = this.jobListings.filter((job) => {
      return (
        (this.searchKeyword
          ? job.title.toLowerCase().includes(this.searchKeyword.toLowerCase())
          : true) &&
        (this.searchLocation
          ? job.location
              .toLowerCase()
              .includes(this.searchLocation.toLowerCase())
          : true) &&
        (this.searchIndustry
          ? job.industry
              .toLowerCase()
              .includes(this.searchIndustry.toLowerCase())
          : true) &&
        (this.searchType
          ? job.type.toLowerCase().includes(this.searchType.toLowerCase())
          : true)
      );
    });
  }
}
