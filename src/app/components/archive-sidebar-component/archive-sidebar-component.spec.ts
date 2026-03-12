import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveSidebarComponent } from './archive-sidebar-component';

describe('ArchiveSidebarComponent', () => {
  let component: ArchiveSidebarComponent;
  let fixture: ComponentFixture<ArchiveSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArchiveSidebarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveSidebarComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
