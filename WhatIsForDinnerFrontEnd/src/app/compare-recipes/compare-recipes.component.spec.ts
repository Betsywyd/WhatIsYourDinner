import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompareRecipesComponent } from './compare-recipes.component';

describe('CompareRecipesComponent', () => {
  let component: CompareRecipesComponent;
  let fixture: ComponentFixture<CompareRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompareRecipesComponent]
    });
    fixture = TestBed.createComponent(CompareRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
