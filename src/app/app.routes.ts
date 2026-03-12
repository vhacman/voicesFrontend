import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { adminGuard } from './guards/admin-guard';
import { HomeComponent } from './pages/home-component/home-component';
import { LoginComponent } from './pages/login-component/login-component';
import { ProfileComponent } from './pages/profile-component/profile-component';
import { AdminDashboardComponent } from './pages/admin-dashboard-component/admin-dashboard-component';
import { BlogPageComponent } from './pages/blog-page-component/blog-page-component';
import { BlogPostFullComponent } from './pages/blog-post-full-component/blog-post-full-component';

// Scelta architetturale: configuro tutte le routes ora, anche se i componenti sono ancora vuoti.
// Creare prima i componenti vuoti e le routes permette di avere la struttura di navigazione
// completa fin da subito, così possiamo spostarci tra i file con comodità e senza interruzioni
// mentre implementiamo il contenuto uno alla volta.
// Le guard sono già attive: anche con componenti vuoti, il flusso di autenticazione funziona.
export const routes: Routes = [

  // Rotta di default: reindirizza sempre alla home
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // Login: unica rotta pubblica, non richiede autenticazione
  { path: 'login', component: LoginComponent },

  // Home: protetta da authGuard, serve il token JWT
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },

  // Pagina del blog: :id è l'id del blog che arriva dall'URL (es. /blogs/3)
  { path: 'blogs/:id', component: BlogPageComponent, canActivate: [authGuard] },

  // Post completo: :id è l'id del post
  { path: 'posts/:id', component: BlogPostFullComponent, canActivate: [authGuard] },

  // Profilo utente loggato
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },

  // Dashboard admin: richiede sia login (authGuard) che ruolo ADMIN (adminGuard).
  // Le guard vengono eseguite in ordine: se authGuard fallisce, adminGuard non viene chiamata.
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard, adminGuard] },

  // Wildcard: qualsiasi URL non riconosciuto → redirect alla home
  { path: '**', redirectTo: 'home' }

];
