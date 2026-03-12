import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './interceptor/auth-interceptor';

// appConfig è il punto di configurazione centrale dell'applicazione Angular.
// Tutto ciò che viene dichiarato in providers è disponibile globalmente in tutta l'app.
export const appConfig: ApplicationConfig = {
  providers: [
    // Gestione globale degli errori del browser (es. errori non catturati)
    provideBrowserGlobalErrorListeners(),

    // Registra il router con le rotte definite in app.routes.ts
    provideRouter(routes),

    // provideHttpClient abilita le chiamate HTTP in tutta l'app.
    // withInterceptors([authInterceptor]) dice ad Angular di far passare
    // OGNI richiesta HTTP attraverso authInterceptor prima di inviarla al backend.
    // Senza withInterceptors, l'interceptor esiste ma non viene mai chiamato.
    // L'array accetta più interceptor in sequenza: vengono eseguiti nell'ordine della lista.
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
