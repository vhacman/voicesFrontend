import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BlogPost } from '../model/blog-post.model';

@Injectable({
  providedIn: 'root'
})
export class BlogPostService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/voices/api/posts';

  // Tutti i post — usato in AdminDashboard
  getAll(): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(this.apiUrl);
  }

  // Un post specifico per id — usato in BlogPostFullComponent
  getById(id: number): Observable<BlogPost> {
    return this.http.get<BlogPost>(`${this.apiUrl}/${id}`);
  }

  // Tutti i post di un blog specifico — usato in BlogPageComponent
  getByBlogId(blogId: number): Observable<BlogPost[]> {
    return this.http.get<BlogPost[]>(`${this.apiUrl}/blog/${blogId}`);
  }

  // Incrementa il contatore visualizzazioni — chiamato quando si apre un post.
  // È una POST e non una GET perché modifica il DB (incrementa viewCount).
  // Il body è {} perché il backend non si aspetta dati, solo l'id nell'URL.
  incrementViewCount(id: number): Observable<BlogPost> {
    return this.http.post<BlogPost>(`${this.apiUrl}/${id}/view`, {});
  }

}
