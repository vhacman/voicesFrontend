import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostParagraphComponent } from './blog-post-paragraph-component';

describe('BlogPostParagraphComponent', () => {
  let component: BlogPostParagraphComponent;
  let fixture: ComponentFixture<BlogPostParagraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogPostParagraphComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogPostParagraphComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
