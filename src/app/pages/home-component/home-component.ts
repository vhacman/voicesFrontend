import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Blog } from '../../model/blog.model';
import { BlogService } from '../../services/blog-service';
import { PortalUserService } from '../../services/portal-user-service';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit
{

  private blogService = inject(BlogService);
  private portalUserService = inject(PortalUserService);

  blogs: Blog[] = [];

  // Leggo il nickname dal localStorage: lo salviamo al login tramite tap() nel service.
  // Lo uso per il saluto in alto nella pagina.
  username = localStorage.getItem('username') ?? '';

  ngOnInit(): void
  {
    this.blogService.getAll().subscribe({
      next: blogs => this.blogs = blogs,
      error: err => console.error('Errore nel caricamento dei blog', err)
    });
  }

  logout(): void
  {
    this.portalUserService.logout();
  }

}
