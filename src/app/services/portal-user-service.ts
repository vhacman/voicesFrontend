import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { LoginRequest, LoginResponse } from '../model/auth.model';

@Injectable({
  providedIn: 'root',
})
export class PortalUserService {

  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://localhost:8080/voices/api/users';

  // Manda le credenziali al backend: se valide riceve il JWT e lo salva nel localStorage.
  // tap() esegue un'azione "di lato" (salvare i dati) senza interrompere l'Observable
  // che arriva al componente, così il componente sa quando il login è completato.
  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userId', String(response.userId));
        localStorage.setItem('username', response.username);
        localStorage.setItem('role', response.role);
        localStorage.setItem('mustChangePassword', response.mustChangePassword);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
