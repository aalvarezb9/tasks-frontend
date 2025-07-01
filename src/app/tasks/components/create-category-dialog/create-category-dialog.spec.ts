import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryDialog } from './create-category-dialog';

describe('CreateCategoryDialog', () => {
  let component: CreateCategoryDialog;
  let fixture: ComponentFixture<CreateCategoryDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateCategoryDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCategoryDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
