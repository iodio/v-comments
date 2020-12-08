import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchBarComponent ],
      imports:[
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('search button should be active only starting with at least 4 characters', () => {
    const inputBox =  fixture.nativeElement.querySelector('input.inputbox-search');
    inputBox.value = 'abc';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button.confirm-search').disabled).toBeTruthy();

    inputBox.value = 'abcd';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button.confirm-search').disabled).toBeFalsy();
  });

  it('should submit a new search filtering on postId when selected', () => {

    component.postIdsList = [1, 2, 3, 4, 5];
    fixture.detectChanges();

    spyOn(component.onSearch, 'emit');
    const selectBox =  fixture.nativeElement.querySelector('#selectBox');
    selectBox.value = selectBox.options[2].value;
    selectBox.dispatchEvent(new Event('change'));

    fixture.detectChanges();

    const formSearch = fixture.nativeElement.querySelector('form#searchForm');
    formSearch.dispatchEvent(new Event('submit'));
    expect(component.onSearch.emit).toHaveBeenCalledWith({
      text: '',
      postId: 2
    });
  });

  it('cancel button should appear only when at least 3 characters have been typed', () => {
    const inputBox =  fixture.nativeElement.querySelector('input.inputbox-search');
    inputBox.value = 'ab';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button.delete-search')).toBeNull();

    inputBox.value = 'abc';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button.delete-search')).toBeDefined();

  });

  it('should delete the input box value when cancel button is clicked', () => {
    const inputBox =  fixture.nativeElement.querySelector('input.inputbox-search');
    inputBox.value = 'abc';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const buttonCancel = fixture.nativeElement.querySelector('button.delete-search');
    buttonCancel.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('input.inputbox-search').value).toEqual('');

  });

  it('should submit a new search when search button is clicked', () => {
    spyOn(component.onSearch, 'emit');
    const inputBox =  fixture.nativeElement.querySelector('input.inputbox-search');
    inputBox.value = 'abcd';
    inputBox.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    const formSearch = fixture.nativeElement.querySelector('form#searchForm');
    formSearch.dispatchEvent(new Event('submit'));
    expect(component.onSearch.emit).toHaveBeenCalledWith({
      text: 'abcd',
      postId: 0
    });
  });
});
