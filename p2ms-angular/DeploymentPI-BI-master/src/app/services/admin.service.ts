import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  // Base API URL for your Spring Boot backend
  private apiUrl = 'http://localhost:8089/api'; // Update with the correct backend URL

  // Store the current user email and role
  private currentUserEmail: string | null = null;
  private currentUserRole: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor(private http: HttpClient) {
    // Load user data from localStorage when the service is initialized
    const savedRole = localStorage.getItem('currentUserRole');
    if (savedRole) {
      this.currentUserRole.next(savedRole);
    }
  }

  // Observable for user role changes
  get userRole$(): Observable<string | null> {
    return this.currentUserRole.asObservable();
  }

  // Login method
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/login', { email, password }).pipe(
      tap(response => {
        // Assuming the response contains a "role" field
        this.currentUserEmail = email;
        this.currentUserRole.next(response.role); // Update the BehaviorSubject
        localStorage.setItem('currentUserEmail', email);
        localStorage.setItem('currentUserRole', response.role);
      })
    );
  }

  // Signup method
  signUp(email: string, password: string, role: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + '/signup', { email, password, role });
  }

  // Method to clear user information (on logout)
  setUserRole(role: string | null): void {
    this.currentUserRole.next(role);
    localStorage.removeItem('currentUserRole');
    localStorage.removeItem('currentUserEmail');
  }

  // Method to check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUserEmail');
  }
}
