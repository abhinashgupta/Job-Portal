import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<{
    id: string;
    role: string;
  } | null>;
  public currentUser: Observable<{ id: string; role: string } | null>;

  private apiUrl = 'http://localhost:4000/api/auth';

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<{
      id: string;
      role: string;
    } | null>(storedUser ? JSON.parse(storedUser) : null);
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): { id: string; role: string } | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
      map((response: any) => {
        if (response && response.token) {
          const user = { id: response.user.id, role: response.user.role };
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(user);
          return { success: true, user };
        } else {
          return { success: false };
        }
      }),
      catchError((error) => {
      
        return [{ success: false }];
      })
    );
  }

  register(
    username: string,
    password: string,
    email: string,
    role: string,
    skills: [],
    education: [],
    workExperience: []
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      password,
      email,
      role,
      skills,
      education,
      workExperience,
    });
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
