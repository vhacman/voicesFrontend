import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-change-password-component',
  imports: [FormsModule],
  templateUrl: './change-password-component.html',
  styleUrl: './change-password-component.css',
})
export class ChangePasswordComponent implements OnInit
{

  private http   = inject(HttpClient);
  private router = inject(Router);

  newPassword     = '';
  confirmPassword = '';
  errorMessage    = '';
  successMessage  = '';

  private userId = localStorage.getItem('userId');

  // Se non c'è token non ha senso essere qui: torno al login.
  ngOnInit(): void
  {
    if (!localStorage.getItem('token'))
      this.router.navigate(['/login']);
  }

  onSubmit(): void
  {
    if (this.newPassword !== this.confirmPassword)
    {
      this.errorMessage = 'Le password non coincidono';
      return;
    }

    this.http.put(`http://localhost:8080/voices/api/users/${this.userId}/password`,
      { newPassword: this.newPassword })
      .subscribe({
        next: () => {
          // Reset del flag: non serve più forzare il cambio password.
          localStorage.setItem('mustChangePassword', 'false');
          this.router.navigate(['/home']);
        },
        error: () => this.errorMessage = 'Errore durante il cambio password. Riprova.'
      });
  }

}
