import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input('currentPage') currentPage;
  @Input('totalResults') totalResults;
  @Output('newPage') newPage = new EventEmitter();
  public lastPage;
  public limit = 10;
  public pages = [0, 1, 2];
  constructor() {}

  ngOnInit(): void {
    this.updateList();
  }
  ngOnChanges() {
    this.updateList();
  }
  updateList() {
    this.pages = this.currentPage > 1 && this.currentPage <= this.lastPage ? [-1, 0, 1] : [0, 1, 2];
    this.lastPage = Math.ceil(this.totalResults / this.limit);

    if (this.lastPage === this.currentPage && this.lastPage > 2) {
      this.pages = this.pages.reverse().map((val) => this.lastPage - val);
    } else {
      this.pages = this.pages.map((val) => this.currentPage + val);
    }
    
    this.pages = this.pages.filter((val) => val <= this.lastPage) ;
  }
  onClick(page) {
    this.newPage.emit(page);
  }

}
