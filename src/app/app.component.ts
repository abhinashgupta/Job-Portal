import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentUser: { id: string; role: string } | null = null;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.currentUser.subscribe((user) => (this.currentUser = user));
  }

  isRecruiter(): boolean {
    return this.currentUser !== null && this.currentUser.role === 'recruiter';
  }

  isJobSeeker(): boolean {
    return this.currentUser !== null && this.currentUser.role === 'jobseeker';
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
