import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PortalUserService } from '../../services/portal-user-service';

@Component({
  selector: 'app-login-component',
  imports: [FormsModule],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit
{

  private portalUserService = inject(PortalUserService);
  private router = inject(Router);

  // I campi del form sono legati a queste proprietà tramite [(ngModel)]
  username = '';
  password = '';
  errorMessage = '';

  // Se l'utente ha già un token valido non ha senso mostrargli il login:
  // lo mando direttamente alla home.
  ngOnInit(): void
  {
    if (localStorage.getItem('token'))
      this.router.navigate(['/home']);
  }

  onSubmit(): void
  {
    this.portalUserService.login({ username: this.username, password: this.password })
      .subscribe({
        next: (response) => {
          // Se la password è scaduta mando l'utente a cambiarla prima di tutto il resto.
          if (response.mustChangePassword === 'true')
            this.router.navigate(['/change-password']);
          else
            this.router.navigate(['/home']);
        },
        error: () => this.errorMessage = 'Credenziali non valide'
      });
  }

}
