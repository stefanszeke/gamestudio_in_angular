import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Tile1024Component } from './tile1024.component';

describe('Tile1024Component', () => {
  let component: Tile1024Component;
  let fixture: ComponentFixture<Tile1024Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Tile1024Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Tile1024Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
