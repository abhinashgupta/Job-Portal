// job-seeker.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JobSeekerService {
  private apiUrl = 'http://localhost:4000/api/jobseekers';

  constructor(private http: HttpClient) {}

  loadJobSeekerProfiles(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  searchProfiles(criteria: any): Observable<any[]> {
    let params = new HttpParams();
    if (criteria.skills) {
      params = params.append('skills', criteria.skills);
    }
    if (criteria.experience) {
      params = params.append('experience', criteria.experience);
    }
    if (criteria.education) {
      params = params.append('education', criteria.education);
    }
    return this.http.get<any[]>(`${this.apiUrl}/search`, { params });
  }
}
