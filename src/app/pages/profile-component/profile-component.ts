import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { PortalUserService } from '../../services/portal-user-service';

@Component({
  selector: 'app-profile-component',
  imports: [RouterLink, FormsModule],
  templateUrl: './profile-component.html',
  styleUrl: './profile-component.css',
})
export class ProfileComponent
{

  private http          = inject(HttpClient);
  portalUserService     = inject(PortalUserService);

  // Dati dell'utente loggato: li prendo dal localStorage perché GET /users/{id}
  // è riservato agli ADMIN. Queste info le abbiamo già dal login.
  username = localStorage.getItem('username') ?? '';
  role     = localStorage.getItem('role') ?? '';
  userId   = localStorage.getItem('userId') ?? '';

  newPassword     = '';
  confirmPassword = '';
  errorMessage    = '';
  successMessage  = '';

  onChangePassword(): void
  {
    if (this.newPassword !== this.confirmPassword)
    {
      this.errorMessage  = 'Le password non coincidono';
      this.successMessage = '';
      return;
    }

    this.http.put(`http://localhost:8080/voices/api/users/${this.userId}/password`,
      { newPassword: this.newPassword })
      .subscribe({
        next: () => {
          localStorage.setItem('mustChangePassword', 'false');
          this.successMessage  = 'Password aggiornata con successo';
          this.errorMessage    = '';
          this.newPassword     = '';
          this.confirmPassword = '';
        },
        error: () => {
          this.errorMessage   = 'Errore durante il cambio password. Riprova.';
          this.successMessage = '';
        }
      });
  }

  logout(): void
  {
    this.portalUserService.logout();
  }

}
