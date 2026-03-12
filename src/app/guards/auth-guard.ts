import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// CanActivateFn è il tipo moderno di Angular per le guard (post v15).
// Invece di una classe con implements CanActivate, è una semplice funzione.
// Angular la chiama automaticamente prima di caricare ogni rotta protetta.
export const authGuard: CanActivateFn = (route, state) =>
{
  // inject() funziona anche fuori dai costruttori nelle funzioni di Angular
  const router = inject(Router);

  // Cerco il token nel localStorage: se esiste l'utente si è già loggato
  // e il backend gli ha restituito un JWT che abbiamo salvato in AuthService.login()
  const token = localStorage.getItem('token');

  if (token)
  {
    // Token trovato → lascio passare, il componente si carica normalmente
    return true;
  }

  // Nessun token trovato → l'utente non è loggato, redirect al login.
  // createUrlTree è preferibile a navigate() perché Angular può usarlo
  // direttamente senza un secondo ciclo di navigazione.
  return router.createUrlTree(['/login']);
};
