import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogHeaderComponent } from './blog-header-component';

describe('BlogHeaderComponent', () => {
  let component: BlogHeaderComponent;
  let fixture: ComponentFixture<BlogHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlogHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlogHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
