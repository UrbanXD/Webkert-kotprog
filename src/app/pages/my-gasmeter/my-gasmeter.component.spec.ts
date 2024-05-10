import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyGasmeterComponent } from './my-gasmeter.component';

describe('MyGasmeterComponent', () => {
  let component: MyGasmeterComponent;
  let fixture: ComponentFixture<MyGasmeterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MyGasmeterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MyGasmeterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
