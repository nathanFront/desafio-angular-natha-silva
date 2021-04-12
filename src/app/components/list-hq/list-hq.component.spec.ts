import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListHqComponent } from './list-hq.component';

describe('ListHqComponent', () => {
  let component: ListHqComponent;
  let fixture: ComponentFixture<ListHqComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListHqComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListHqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
