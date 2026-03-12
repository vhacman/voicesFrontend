import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../model/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/voices/api/comments';

  // Tutti i commenti di un post — usato in CommentListComponent
  getByPostId(postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/post/${postId}`);
  }

  // Crea un nuovo commento — il backend genera id e publishedOn automaticamente
  create(comment: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(this.apiUrl, comment);
  }

  // Elimina un commento — usato da ADMIN o dall'autore del commento
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}
