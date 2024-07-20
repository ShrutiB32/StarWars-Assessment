import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/core/services/common.service';

const tableData = [
  {
    name: 'qwert',
    species: 'human',
    birthYear: '2344',
  },
  {
    name: 'qwert',
    species: 'human',
    birthYear: '2344',
  },
  {
    name: 'qwert',
    species: 'human',
    birthYear: '2344',
  },
  {
    name: 'qwert',
    species: 'human',
    birthYear: '2344',
  },
];

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  constructor(private router: Router, private commonService: CommonService) {}
  @Input() tableData: any;

  displayCharacterDetails(data: any, id: any) {
    this.commonService.setCharacterDetails(data);
    this.router.navigate([`people/${id}`]);
  }
}
