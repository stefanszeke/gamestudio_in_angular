import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlocksFieldComponent } from './blocks-field.component';

describe('BlocksFieldComponent', () => {
  let component: BlocksFieldComponent;
  let fixture: ComponentFixture<BlocksFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlocksFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlocksFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
