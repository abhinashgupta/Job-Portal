import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  private apiUrl = 'http://localhost:4000/api/jobs';

  constructor(private http: HttpClient) {}

  postJob(job: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/post`, job);
  }

  getJobListingsByRecruiter(recruiterId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/recruiter/${recruiterId}`);
  }

  getAllJobListings(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
