import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Role } from '../model/enums';

// AdminGuard si usa INSIEME ad AuthGuard sulle rotte riservate agli amministratori.
// AuthGuard controlla che l'utente sia loggato, AdminGuard controlla che sia ADMIN.
// Nelle rotte: canActivate: [authGuard, adminGuard] → entrambe devono restituire true.
export const adminGuard: CanActivateFn = (route, state) =>
{
  const router = inject(Router);

  // Leggo il ruolo salvato nel localStorage da AuthService.login()
  const role = localStorage.getItem('role');

  // Confronto con Role.ADMIN dall'enum invece della stringa 'ADMIN':
  // se il valore dell'enum cambia nel backend, il compilatore TypeScript lo segnala subito
  if (role === Role.ADMIN)
  {
    // Ruolo ADMIN confermato → accesso consentito
    return true;
  }

  // Utente loggato ma con ruolo BLOGGER → non ha i permessi per questa pagina,
  // lo rimando alla home invece che al login (è già autenticato, solo non autorizzato)
  return router.createUrlTree(['/home']);
};
