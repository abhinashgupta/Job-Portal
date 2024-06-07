import { Component } from '@angular/core';

@Component({
  selector: 'app-access-denied',
  template: `
    <h2>Access Denied</h2>
    <p>You do not have permission to view this page.</p>
  `,
  styleUrls: ['./access-denied.component.css'],
})
export class AccessDeniedComponent {}
