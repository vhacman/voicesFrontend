import { Component, inject, OnInit } from '@angular/core';
import { SlicePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Blog } from '../../model/blog.model';
import { BlogPost } from '../../model/blog-post.model';
import { PostsByYear } from '../../model/archive.model';
import { BlogService } from '../../services/blog-service';
import { BlogPostService } from '../../services/blog-post-service';
import { PortalUserService } from '../../services/portal-user-service';

@Component({
  selector: 'app-blog-page-component',
  imports: [RouterLink, SlicePipe],
  templateUrl: './blog-page-component.html',
  styleUrl: './blog-page-component.css',
})
export class BlogPageComponent implements OnInit
{

  private route             = inject(ActivatedRoute);
  private blogService       = inject(BlogService);
  private blogPostService   = inject(BlogPostService);
  private portalUserService = inject(PortalUserService);

  blog:     Blog | null = null;
  username = localStorage.getItem('username') ?? '';
  posts:    BlogPost[]  = [];
  archive:  { [year: number]: PostsByYear } = {};
  archiveYears: number[] = [];

  ngOnInit(): void
  {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.blogService.getById(id).subscribe({
      next: blog => this.blog = blog,
      error: err => console.error('Errore nel caricamento del blog', err)
    });

    this.blogPostService.getByBlogId(id).subscribe({
      next: posts => this.posts = posts,
      error: err => console.error('Errore nel caricamento dei post', err)
    });

    // L'archivio raggruppa i post per anno/mese: lo uso nella sidebar.
    // Object.keys restituisce stringhe, map(Number) le converte in numeri
    // così posso iterare con @for e accedere a archive[year].
    this.blogService.getArchive(id).subscribe({
      next: archive => {
        this.archive = archive;
        this.archiveYears = Object.keys(archive).map(Number).sort((a, b) => b - a);
      },
      error: err => console.error('Errore nel caricamento dell\'archivio', err)
    });
  }

  // Nomi dei mesi in italiano per la sidebar archivio.
  monthName(monthIndex: number): string
  {
    const names = ['Gennaio','Febbraio','Marzo','Aprile','Maggio','Giugno',
                   'Luglio','Agosto','Settembre','Ottobre','Novembre','Dicembre'];
    return names[monthIndex];
  }

  logout(): void
  {
    this.portalUserService.logout();
  }

}
