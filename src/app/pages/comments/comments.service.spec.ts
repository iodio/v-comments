import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { CommentsService } from './comments.service';
import { from } from 'rxjs/internal/observable/from';

describe('CommentsService', () => {
  beforeEach(() => {
   return TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ]});
  }

    );

  it('should be created', () => {
    const service: CommentsService = TestBed.get(CommentsService);
    expect(service).toBeTruthy();
  });
});
