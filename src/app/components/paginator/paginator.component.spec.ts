import { componentFactoryName } from '@angular/compiler';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginatorComponent } from './paginator.component';

describe('PaginatorComponent', () => {
  let component: PaginatorComponent;
  let fixture: ComponentFixture<PaginatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginatorComponent);
    component = fixture.componentInstance;
    component.totalPages = 10;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should contains value "1" as present page at creation',() => {
    expect(fixture.nativeElement.querySelector('div.present-page').textContent).toContain(1);
  });

  it('should contains the right present page number when page changed', () => {
    expect(fixture.nativeElement.querySelector('div.present-page').textContent).toContain(component.presentPage);

    component.presentPage = 5;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('div.present-page').textContent).toContain(component.presentPage);
  });

  it('should contains the right number of pages (total)', () => {
    expect(fixture.nativeElement.querySelector('div.total-page').textContent).toContain(component.presentPage);
  });

  it('should have both buttons as active when present page is not the first one nor the last one', () => {
    component.presentPage = 5;
    component.totalPages = 10;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button.navigation-button.prev').disabled).toBeFalsy();
    expect(fixture.nativeElement.querySelector('button.navigation-button.next').disabled).toBeFalsy();
  });

  it('should not go the next page if present page is the last page', () => {
    component.presentPage = 10;
    component.totalPages = 10;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button.navigation-button.next').disabled).toBeTruthy();
  });


  it('should not go the prev page if present page is the first page', () => {
    component.presentPage = 1;
    component.totalPages = 10;
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('button.navigation-button.prev').disabled).toBeTruthy();
  });

  it('should emit a message with page number when a user click on the button to get the previous page', () => {
    component.presentPage = 5;
    component.totalPages = 10;
    fixture.detectChanges();

    spyOn(component.navigateTo, 'emit');

    const buttonPrev = fixture.nativeElement.querySelector('button.navigation-button.prev');
    buttonPrev.dispatchEvent(new Event('click'));
    expect(component.navigateTo.emit).toHaveBeenCalledWith(4);
  });

  it('should emit a message with page number when a user click on the button to get the next page', () => {
    component.presentPage = 5;
    component.totalPages = 10;
    fixture.detectChanges();

    spyOn(component.navigateTo, 'emit');

    const buttonPrev = fixture.nativeElement.querySelector('button.navigation-button.next');
    buttonPrev.dispatchEvent(new Event('click'));
    expect(component.navigateTo.emit).toHaveBeenCalledWith(6);
  });
});
