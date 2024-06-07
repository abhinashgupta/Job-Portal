import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  email: string = '';
  role: string = 'jobseeker';
  skills: string[] = [];
  workExperience: {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
  }[] = [];
  education: { degree: string; university: string; year: string }[] = [];
  error: string | null = null;


  apiUrl = 'http://localhost:4000/api/auth';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  register(
    username: string,
    password: string,
    email: string,
    role: string,
    skills: string[] = [''],
    workExperience: {
      title: string;
      company: string;
      startDate: string;
      endDate: string;
      description: string;
    }[],
    education: { degree: string; university: string; year: string }[]
  ): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, {
      username,
      password,
      email,
      role,
      skills,
      workExperience,
      education,
    });
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }
  onSubmit() {
    this.register(
      this.username,
      this.password,
      this.email,
      this.role,
      this.skills,
      this.workExperience,
      this.education
    ).subscribe(
      () => {

        this.router.navigate(['/login']);
      },
      (error: any) => {
        this.error = 'Registration failed. Please try again later.';
      }
    );
  }

 
  addSkill() {
    this.skills.push('');
  }

  removeSkill(index: number) {
    this.skills.splice(index, 1);
  }

  addWorkExperience() {
    this.workExperience.push({
      title: '',
      company: '',
      startDate: '',
      endDate: '',
      description: '',
    });
  }

  removeWorkExperience(index: number) {
    this.workExperience.splice(index, 1);
  }

  addEducation() {
    this.education.push({ degree: '', university: '', year: '' });
  }

  removeEducation(index: number) {
    this.education.splice(index, 1);
  }
}
