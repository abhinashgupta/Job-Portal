import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  private apiUrl = 'http://localhost:4000/api/userProfiles/data';

  constructor(private http: HttpClient) {}

  getUserProfile(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateUserProfile(id: string, userProfile: any): Observable<any> {
    console.log(`Updating user profile with ID: ${id}`);
    console.log(`Profile data:`, userProfile);
    return this.http.put<any>(`${this.apiUrl}/${id}`, userProfile);
  }

  uploadProfilePicture(id: string, formData: FormData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/${id}/profilePicture`, formData);
  }
}
