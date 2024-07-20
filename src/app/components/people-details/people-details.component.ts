import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { CommonService } from 'src/app/core/services/common.service';
import { IPerson } from 'src/app/core/types/types';

@Component({
  selector: 'app-people-details',
  templateUrl: './people-details.component.html',
  styleUrls: ['./people-details.component.scss'],
})
export class PeopleDetailsComponent implements OnInit {
  constructor(private commonService: CommonService) {}

  characterDetails!: IPerson;

  ngOnInit(): void {
    this.commonService.getCharacterDetails().subscribe((response: any) => {
      this.characterDetails = response;
    });
  }
}
