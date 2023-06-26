import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavedRecipeDetailsComponent } from './saved-recipe-details.component';

describe('SavedRecipeDetailsComponent', () => {
  let component: SavedRecipeDetailsComponent;
  let fixture: ComponentFixture<SavedRecipeDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SavedRecipeDetailsComponent]
    });
    fixture = TestBed.createComponent(SavedRecipeDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
