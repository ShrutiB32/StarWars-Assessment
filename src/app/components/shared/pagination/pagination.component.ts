import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  constructor(private commonService: CommonService) {}
  ngOnInit(): void {
    this.commonService.getCurrentPageNumber().subscribe({
      next: (response: any) => {
        this.currentPage = response;
      },
    });
  }

  @Input() currentPage: any;
  @Output() paginationValueEmitter = new EventEmitter();

  onGotoNextPage(event: any) {
    if (event === 'Next') {
      this.currentPage = Number(this.currentPage) + 1;
    } else {
      this.currentPage = event;
    }
    console.log(this.currentPage);
    this.paginationValueEmitter.emit(this.currentPage);
  }
}
