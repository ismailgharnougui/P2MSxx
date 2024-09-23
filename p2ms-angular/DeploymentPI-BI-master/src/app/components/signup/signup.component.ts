import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  form: any = {
    email: '',
    password: '',
    role: ''
  };
  errorMessage: string = '';

  constructor(private authService: AdminService, private router: Router) {}

  onSubmit(): void {
    this.authService.signUp(this.form.email, this.form.password, this.form.role).subscribe({
      next: (response) => {
        console.log('Signup successful', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Signup failed', err);
        this.errorMessage = 'Signup failed. Please try again.';
      }
    });
  }
}
