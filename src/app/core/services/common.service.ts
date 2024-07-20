import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { IPerson } from '../types/types';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  constructor(private http: HttpClient) {}

  getCharacterList(pageNumber: any) {
    return this.http.get(`https://swapi.dev/api/people/?page=${pageNumber}`);
  }

  getCharactersSpecies(link: string) {
    return this.http.get(link);
  }

  getCharactersFilms(link: string) {
    return this.http.get(link);
  }
  getCharactersStarships(link: string) {
    return this.http.get(link);
  }
  getCharactersVehicles(link: string) {
    return this.http.get(link);
  }

  currentPageNo = new BehaviorSubject(1);

  setCurrentPageNumber(data: number) {
    this.currentPageNo.next(data);
  }
  getCurrentPageNumber() {
    return this.currentPageNo.asObservable();
  }

  characterDetails = new BehaviorSubject({});

  setCharacterDetails(data: IPerson) {
    this.characterDetails.next(data);
  }
  getCharacterDetails() {
    return this.characterDetails.asObservable();
  }
}
