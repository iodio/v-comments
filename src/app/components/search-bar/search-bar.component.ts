import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'vodafone-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onSearch = new EventEmitter<any>();


  @Input() postIdsList: number[];

  searchForm: FormGroup;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    this.searchForm = this.fb.group({
      bar: this.fb.group({
        text: this.fb.control('', [Validators.required, Validators.minLength(4)]),
      }),
      postId: this.fb.control(0, null)
    });
  }

  onSubmit() {
    this.onSearch.emit({
      text: this.searchForm.get('bar.text').value,
      // tslint:disable-next-line: radix
      postId: parseInt(this.searchForm.get('postId').value)
    });
  }

  reset() {
    this.searchForm.patchValue({
      bar: {
        text: ''
      }
    });
    this.onSubmit();
  }

}
