import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vodafone-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {


  @Input() totalPages: number;
  @Input() presentPage: number;

  @Output() navigateTo = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    if (!this.presentPage) { this.presentPage = 1; }
  }

  next() {
    this.navigateTo.emit(this.presentPage + 1);
  }

  prev() {
    this.navigateTo.emit(this.presentPage - 1);
  }

  goTo(p){
    this.navigateTo.emit(p);
  }

}
