import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Blog } from '../model/blog.model';
import { PostsByYear } from '../model/archive.model';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/voices/api/blogs';

  // Tutti i blog — usato nella home per mostrare la lista
  getAll(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.apiUrl);
  }

  // Un blog specifico per id — usato in BlogPageComponent
  getById(id: number): Observable<Blog> {
    return this.http.get<Blog>(`${this.apiUrl}/${id}`);
  }

  // Archivio del blog: post raggruppati per anno/mese — usato in ArchiveSidebarComponent.
  // La Map<Integer, PostsByYear> di Java diventa in JSON un oggetto con chiavi numeriche:
  // { "2023": { year: 2023, months: [...] }, "2024": { ... } }
  // { [year: number]: PostsByYear } è una "index signature" di TypeScript:
  // dice che le chiavi sono numeri (gli anni) e i valori sono oggetti PostsByYear.
  // Usiamo questo tipo invece di "any" così TypeScript sa cosa c'è dentro
  // e ci aiuta con l'autocompletamento (es. archive[2024].months è già tipizzato).
  getArchive(id: number): Observable<{ [year: number]: PostsByYear }> {
    return this.http.get<{ [year: number]: PostsByYear }>(`${this.apiUrl}/${id}/archive`);
  }

}
