import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response: any) => {
        if (response.success) {
          const role = response.user.role; 
          if (role === 'jobseeker') {
            console.log('Navigating to profile');
            this.router.navigate(['/profile']);
          } else if (role === 'recruiter') {
            console.log('Navigating to recruiter dashboard');
            this.router.navigate(['/recruiter-dashboard']);
          }
        }
      },
      (error: HttpErrorResponse) => {
        console.error('Login error:', error);
        if (error.status === 401) {
          this.error = 'Invalid username or password';
        } else {
          this.error = 'Login failed. Please try again later.';
        }
      }
    );
  }
}
