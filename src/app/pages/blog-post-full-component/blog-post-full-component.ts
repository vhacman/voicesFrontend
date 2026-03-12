import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { BlogPost } from '../../model/blog-post.model';
import { Comment } from '../../model/comment.model';
import { BlogPostService } from '../../services/blog-post-service';
import { CommentService } from '../../services/comment-service';
import { PortalUserService } from '../../services/portal-user-service';

@Component({
  selector: 'app-blog-post-full-component',
  imports: [RouterLink, FormsModule],
  templateUrl: './blog-post-full-component.html',
  styleUrl: './blog-post-full-component.css',
})
export class BlogPostFullComponent implements OnInit
{

  private route           = inject(ActivatedRoute);
  private blogPostService = inject(BlogPostService);
  private commentService  = inject(CommentService);
  portalUserService       = inject(PortalUserService);

  post:     BlogPost | null = null;
  comments: Comment[]       = [];

  // Testo del nuovo commento che l'utente sta scrivendo
  newCommentText = '';
  commentError   = '';

  username = localStorage.getItem('username') ?? '';
  userId   = Number(localStorage.getItem('userId'));
  role     = localStorage.getItem('role') ?? '';

  ngOnInit(): void
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Incremento le views al caricamento del post, poi carico i dati.
    this.blogPostService.incrementViewCount(id).subscribe();

    this.blogPostService.getById(id).subscribe({
      next: post => this.post = post,
      error: err => console.error('Errore nel caricamento del post', err)
    });

    this.loadComments(id);
  }

  loadComments(postId: number): void
  {
    this.commentService.getByPostId(postId).subscribe({
      next: comments => this.comments = comments,
      error: err => console.error('Errore nel caricamento dei commenti', err)
    });
  }

  submitComment(): void
  {
    if (!this.newCommentText.trim())
    {
      this.commentError = 'Il commento non può essere vuoto';
      return;
    }

    const postId = Number(this.route.snapshot.paramMap.get('id'));

    // Il backend si aspetta postId (flat int) + author annidato con id.
    this.commentService.create({
      text:    this.newCommentText,
      postId:  postId,
      author:  { id: this.userId, nickname: this.username }
    } as any).subscribe({
      next: () => {
        this.newCommentText = '';
        this.commentError   = '';
        this.loadComments(postId);
      },
      error: () => this.commentError = 'Errore nell\'invio del commento'
    });
  }

  // Un utente può eliminare solo i propri commenti; l'ADMIN può eliminare tutti.
  canDelete(comment: Comment): boolean
  {
    return this.role === 'ADMIN' || comment.author?.id === this.userId;
  }

  deleteComment(commentId: number): void
  {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.commentService.delete(commentId).subscribe({
      next: () => this.loadComments(postId),
      error: err => console.error('Errore nell\'eliminazione del commento', err)
    });
  }

  logout(): void
  {
    this.portalUserService.logout();
  }

}
