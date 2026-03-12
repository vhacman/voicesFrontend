import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostFullComponent } from './blog-post-full-component';

describe('BlogPostFullComponent', () => {
  let component: BlogPostFullComponent;
  let fixture: ComponentFixture<BlogPostFullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostFullComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostFullComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
