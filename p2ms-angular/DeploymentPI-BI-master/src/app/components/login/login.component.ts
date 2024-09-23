import { Component } from '@angular/core';
import { Router } from '@angular/router'; // To handle navigation after login
import { Observable } from 'rxjs';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  form: any = {
    email: '',
    password: ''
  };
  errorMessage: string = '';

  constructor(private authService: AdminService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.form.email, this.form.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        // Navigate to the dashboard or another route after successful login
        this.router.navigate(['/overview']);
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Login failed. Please check your credentials.';
      }
    });
  }
  onSignUp(): void {
    this.router.navigate(['/signup']);  // Assumes you have a route for the sign-up page
  }
  
}