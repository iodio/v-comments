import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentsRoutingModule } from './comments-routing.module';
import { CommentsComponent } from './comments.component';
import { HttpClientModule } from '@angular/common/http';
import { CommentItemComponent } from 'src/app/components/comment-item/comment-item.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaginatorComponent } from 'src/app/components/paginator/paginator.component';


@NgModule({
  declarations: [
    CommentsComponent,
    CommentItemComponent,
    SearchBarComponent,
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    CommentsRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CommentsModule { }
