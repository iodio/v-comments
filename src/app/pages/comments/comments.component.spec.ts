import { HttpClient, HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { from } from 'rxjs/internal/observable/from';
import { CommentItemComponent } from 'src/app/components/comment-item/comment-item.component';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';

import { CommentsComponent } from './comments.component';
import { CommentsService } from './comments.service';
import { Comment } from './models/commentModel';
import { CommentsPage } from './models/CommentsPage';

describe('CommentsComponent', () => {
  let component: CommentsComponent;
  let fixture: ComponentFixture<CommentsComponent>;

  let http: HttpClient;
  let fakeData: Array<Comment>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CommentsComponent,
        CommentItemComponent,
        SearchBarComponent,
        PaginatorComponent
      ],
      imports: [
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    http = TestBed.get(HttpClient);
    fakeData = [
      {id: 1, name: 'Francesco', postId: 1, email: 'francesco@fra.it', body: 'Francesco Di Iorio nato a Napoli.'},
      {id: 2, name: 'Alice', postId: 1, email: 'alice@fra.it', body: 'Alice nato a Roma.'},
      {id: 3, name: 'Bob Franco', postId: 2, email: 'bob@alice.it', body: 'Bob nato a Milano.'},
      {id: 4, name: 'Sabatino', postId: 3, email: 'sab@alice.it', body: 'Sabatino nata a Caserta.'},
      {id: 5, name: 'Annamaria', postId: 3, email: 'abb@alice.it', body: 'Annamaria nata a Milano.'},
      {id: 6, name: 'Annamaria', postId: 3, email: 'cc@alice.it', body: 'Annamaria nata a Milano.'}
    ];

    spyOn(http, 'get').and.returnValue(from([ fakeData ]));


  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should not display anything if response is null.', () => {
    const service: CommentsService = TestBed.get(CommentsService);


    const fakeResponse: CommentsPage = {
      comments: null,
      page: 1,
      totSize: 1,
      size: 1,
      totPage: 1
    };


    spyOn(service, 'searchElementsPageByQuery').and.callFake(() => {
      return from([ fakeResponse ]);
    });
    component.searchComments('', null);
    expect(component.listOfComments).toBeNull();
  });

  it('should display all the elements it can get', () => {
    const fakeResponseComment: Array<Comment> = [{
      body: 'test',
      id: 1,
      email: 'test@test.it',
      postId: 1,
      name: 'test name'
    }];

    const fakeResponse: CommentsPage = {
      comments: fakeResponseComment,
      page: 1,
      totSize: 1,
      size: 1,
      totPage: 1
    };

    const service: CommentsService = TestBed.get(CommentsService);

    spyOn(service, 'searchElementsPageByQuery').and.callFake(() => {
      return from([ fakeResponse ]);
    });

    component.searchComments('', null);
    expect(component.listOfComments).toBe(fakeResponse.comments);
  });

  it('should be an empty array if there is no element', () => {
    const service: CommentsService = TestBed.get(CommentsService);

    const fakeResponse: CommentsPage = {
      comments: [],
      page: 1,
      totSize: 1,
      size: 1,
      totPage: 1
    };


    spyOn(service, 'searchElementsPageByQuery').and.callFake(() => {
      return from([ fakeResponse ]);
    });

    component.searchComments('', null);
    expect(component.listOfComments.length).toBeLessThanOrEqual(0);
  });

  it('should receive all results when search and filtering is not active', () => {

    component.searchComments('', null);
    expect(component.listOfComments.length).toBe(fakeData.length);
    expect(component.listOfComments).toEqual(fakeData);

    component.searchComments(null, null);
    expect(component.listOfComments.length).toBe(fakeData.length);
    expect(component.listOfComments).toEqual(fakeData);

  });

  it('should filter properly for post ID', () => {
    component.searchComments('', 1);
    expect(component.listOfComments.length).toBe(2);

    component.searchComments('', 2);
    expect(component.listOfComments.length).toBe(1);
  });

  it('should search properly for text (insensitive search)', () => {
    component.searchComments('Francesco', null);
    expect(component.listOfComments.length).toBe(1);

    component.searchComments('francesco', null);
    expect(component.listOfComments.length).toBe(1);

    component.searchComments('FRANCESCO', null);
    expect(component.listOfComments.length).toBe(1);

    component.searchComments('FRANCESCO213423411324', null);
    expect(component.listOfComments.length).toBe(0);
  });

  it('should search properly for text and filter for post ID', () => {
    component.searchComments('Francesco', 1);
    expect(component.listOfComments.length).toBe(1);

    component.searchComments('Francesco', 2);
    expect(component.listOfComments.length).toBe(0);

    component.searchComments('FRAN', 2);
    expect(component.listOfComments.length).toBe(1);

    component.searchComments('fran', null);
    expect(component.listOfComments.length).toBe(2);
  });

  it('should use the pagination', () => {
    component.searchComments(null, null, 1, 5);
    expect(component.listOfComments.length).toBe(5);

    component.searchComments(null, null, 1, 3);
    expect(component.listOfComments.length).toBe(3);

    component.searchComments(null, null, 2, 3);
    expect(component.listOfComments.length).toBe(3);

    component.searchComments(null, null, 10, 3);
    expect(component.listOfComments.length).toBe(0);
  });

  it('should use the pagination in combo with search and filtering', () => {
    component.searchComments('', 3, 1, 5);
    expect(component.listOfComments.length).toBe(3);

    component.searchComments('', 3, 1, 2);
    expect(component.listOfComments.length).toBe(2);

    component.searchComments('', 3, 2, 2);
    expect(component.listOfComments.length).toBe(1);

    component.searchComments('FRA', null, 1, 5);
    expect(component.listOfComments.length).toBe(3);

    component.searchComments('FRA', null, 1, 2);
    expect(component.listOfComments.length).toBe(2);

    component.searchComments('FRA', null, 2
    , 2);
    expect(component.listOfComments.length).toBe(1);

    component.searchComments('FRA', 1, 0, 1);
    expect(component.listOfComments.length).toBe(1);

    component.searchComments('FRA', 1, 0, 2);
    expect(component.listOfComments.length).toBe(2);
  });


});
