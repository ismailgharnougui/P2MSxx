import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleDashboardComponent } from './article-dashboard.component';

describe('ArticleDashboardComponent', () => {
  let component: ArticleDashboardComponent;
  let fixture: ComponentFixture<ArticleDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArticleDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArticleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
