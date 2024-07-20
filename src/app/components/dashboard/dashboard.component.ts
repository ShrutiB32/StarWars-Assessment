import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommonService } from 'src/app/core/services/common.service';
import { IBirthYear, IFilm, IPerson, ISpecies, IStarship, IVehicle } from 'src/app/core/types/types';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private commonService: CommonService) {}

  movies: IFilm[]=[];
  currentPage: number = 1;
  tableData: IPerson[] = [];
  filteredData: IPerson[] = [];
  starShips: IStarship[] = [];
  vehicles: IVehicle[] = [];
  species: ISpecies[] = [];
  birthYear: IBirthYear[] = [];
  paginationClicked: boolean = false;
  setTimer: any;
  isNoDataFound: boolean = false;
  accordianTitleActive = {
    isMovieClassActive: false,
    isSpeciesClassActive: false,
    isStarshipClassActive: false,
    isVehiclesClassActive: false,
    isBirthYearClassActive: false,
  };
  accordianActiveStatus = [
    {
      id: 'movies',
      isActive: false,
    },
    {
      id: 'starships',
      isActive: false,
    },
    {
      id: 'species',
      isActive: false,
    },
    {
      id: 'vehicles',
      isActive: false,
    },
    {
      id: 'birth_year',
      isActive: false,
    },
  ];

  filterFormValues = {
    movies: '',
    starships: '',
    species: '',
    vehicles: '',
    birthYear: '',
  };

  ngOnInit(): void {
    this.commonService.getCurrentPageNumber().subscribe((data: any) => {
      this.currentPage = data;
    });
    clearTimeout(this.setTimer);
    this.paginationClicked = false;
    this.loadTableData(this.currentPage);
    this.getMovies();
    this.getStarships();
    this.getVehicles();
    this.getSpecies();
  }

  loadTableData(pageNumber: any) {
    this.commonService.setCurrentPageNumber(pageNumber);
    this.commonService.getCharacterList(pageNumber).subscribe({
      next: (response: any) => {
        this.processCharacterData(response.results);
      },
    });
  }

  processCharacterData(results: any[]) {
    results.forEach((data: any) => {
      this.processBirthYear(data);
      this.processSpecies(data);
      this.processFilms(data);
      this.processStarships(data);
      this.processVehicles(data);
    });
    this.tableData = results;
    if (this.paginationClicked) {
      this.setTimer = setTimeout(() => {
        this.filteredData = this.tableData.filter((data: any) => {
          const matchesMovies =
            !this.filterFormValues.movies ||
            data.filmNames.includes(this.filterFormValues.movies);
          const matchesStarships =
            !this.filterFormValues.starships ||
            data.starshipsNames.includes(this.filterFormValues.starships);
          const matchesSpecies =
            !this.filterFormValues.species ||
            data.speciesNames.includes(this.filterFormValues.species);
          const matchesVehicles =
            !this.filterFormValues.vehicles ||
            data.vehiclesNames.includes(this.filterFormValues.vehicles);
          const matchesBirthYear =
            !this.filterFormValues.birthYear ||
            data.birth_year === this.filterFormValues.birthYear;
          return (
            matchesMovies &&
            matchesStarships &&
            matchesSpecies &&
            matchesVehicles &&
            matchesBirthYear
          );
        });

        this.filteredData.length === 0
          ? (this.isNoDataFound = true)
          : (this.isNoDataFound = false);
      }, 3000);
    } else {
      this.filteredData = this.tableData;
    }
    this.paginationClicked = false;
  }

  processBirthYear(data: any) {
    const exists = this.birthYear.some(
      (item: any) => item.name === data.birth_year
    );

    if (!exists) {
      this.birthYear.push({
        name: data.birth_year,
        checked: false,
      });
    }
  }

  processSpecies(data: any) {
    if (data.species.length !== 0) {
      const species = data.species;
      data.speciesNames = [];
      species.forEach((specie: any) => {
        this.commonService.getCharactersSpecies(specie).subscribe({
          next: (response: any) => {
            data.speciesNames.push(response.classification);
          },
        });
      });
    } else {
      data.speciesNames = [];
    }
  }

  processFilms(data: any) {
    if (data.films.length !== 0) {
      const films = data.films;
      data.filmNames = [];
      films.forEach((film: any) => {
        this.commonService.getCharactersFilms(film).subscribe({
          next: (response: any) => {
            data.filmNames.push(response.title);
          },
        });
      });
    } else {
      data.filmNames = [];
    }
  }

  processStarships(data: any) {
    if (data.starships.length !== 0) {
      const starships = data.starships;
      data.starshipsNames = [];
      starships.forEach((starship: any) => {
        this.commonService.getCharactersStarships(starship).subscribe({
          next: (response: any) => {
            data.starshipsNames.push(response.name);
          },
        });
      });
    } else {
      data.starshipsNames = [];
    }
  }

  processVehicles(data: any) {
    if (data.vehicles.length !== 0) {
      const vehicles = data.vehicles;
      data.vehiclesNames = [];
      vehicles.forEach((vehicle: any) => {
        this.commonService.getCharactersVehicles(vehicle).subscribe({
          next: (response: any) => {
            if (!data.vehiclesNames.includes(response.name)) {
              data.vehiclesNames.push(response.name);
            }
          },
        });
      });
    } else {
      data.vehiclesNames = [];
    }
  }

  getMovies() {
    this.commonService
      .getCharactersFilms('https://swapi.dev/api/films/')
      .subscribe({
        next: (response: any) => {
          this.movies = response.results;

          this.movies.map((data: any) => (data.checked = false));
        },
      });
  }

  getStarships() {
    this.commonService
      .getCharactersFilms('https://swapi.dev/api/starships/')
      .subscribe({
        next: (response: any) => {
          this.starShips = response.results;
          this.starShips.map((data: any) => (data.checked = false));
        },
      });
  }

  getSpecies() {
    this.commonService
      .getCharactersFilms('https://swapi.dev/api/species/')
      .subscribe({
        next: (response: any) => {
          this.species = response.results;
          this.species.map((data: any) => (data.checked = false));
        },
      });
  }

  getVehicles() {
    this.commonService
      .getCharactersFilms('https://swapi.dev/api/vehicles/')
      .subscribe({
        next: (response: any) => {
          this.vehicles = response.results;
          this.vehicles.map((data: any) => (data.checked = false));
        },
      });
  }

  onPaginationClick(event: any) {
    this.currentPage = event;
    this.tableData = [];
    this.filteredData = [];
    this.birthYear = [];
    clearTimeout(this.setTimer);
    this.loadTableData(event);
    this.paginationClicked = true;
    this.isNoDataFound = false;
  }

  toggleDropDownIcon(text: any) {
    this.accordianActiveStatus.map((data: any) => {
      if (text !== data.id) {
        data.isActive = false;
      } else {
        data.isActive = !data.isActive;
      }
    });
    // this.isDropClicked = !this.isDropClicked
  }

  onSelectItem(selectedItem: any, id: any) {
    selectedItem.checked = !selectedItem.checked;
    if (id === 'movies') {
      selectedItem.checked
        ? (this.filterFormValues = {
            ...this.filterFormValues,
            movies: selectedItem.title,
          })
        : (this.filterFormValues = { ...this.filterFormValues, movies: '' });

      this.accordianTitleActive.isMovieClassActive = true;
      this.movies.map((data: any) => {
        if (
          data.name !== selectedItem.name ||
          data.title !== selectedItem.title
        ) {
          data.checked = false;
        }
      });

      if (this.movies.every((option: any) => !option.checked)) {
        this.accordianTitleActive.isMovieClassActive = false;
      }
    }

    if (id === 'starships') {
      selectedItem.checked
        ? (this.filterFormValues = {
            ...this.filterFormValues,
            starships: selectedItem.name,
          })
        : (this.filterFormValues = { ...this.filterFormValues, starships: '' });

      this.accordianTitleActive.isStarshipClassActive = true;
      this.starShips.map((data: any) => {
        if (
          data.name !== selectedItem.name ||
          data.title !== selectedItem.title
        ) {
          data.checked = false;
        }
      });

      if (this.starShips.every((option: any) => !option.checked)) {
        this.accordianTitleActive.isStarshipClassActive = false;
      }
    }

    if (id === 'vehicles') {
      selectedItem.checked
        ? (this.filterFormValues = {
            ...this.filterFormValues,
            vehicles: selectedItem.name,
          })
        : (this.filterFormValues = { ...this.filterFormValues, vehicles: '' });

      this.accordianTitleActive.isVehiclesClassActive = true;
      this.vehicles.map((data: any) => {
        if (
          data.name !== selectedItem.name ||
          data.title !== selectedItem.title
        ) {
          data.checked = false;
        }
      });

      if (this.vehicles.every((option: any) => !option.checked)) {
        this.accordianTitleActive.isVehiclesClassActive = false;
      }
    }

    if (id === 'species') {
      selectedItem.checked
        ? (this.filterFormValues = {
            ...this.filterFormValues,
            species: selectedItem.name,
          })
        : (this.filterFormValues = { ...this.filterFormValues, species: '' });

      this.accordianTitleActive.isSpeciesClassActive = true;
      this.species.map((data: any) => {
        if (
          data.name !== selectedItem.name ||
          data.title !== selectedItem.title
        ) {
          data.checked = false;
        }
      });

      if (this.species.every((option: any) => !option.checked)) {
        this.accordianTitleActive.isSpeciesClassActive = false;
      }
    }

    if (id === 'birthYear') {
      selectedItem.checked
        ? (this.filterFormValues = {
            ...this.filterFormValues,
            birthYear: selectedItem.name,
          })
        : (this.filterFormValues = { ...this.filterFormValues, birthYear: '' });

      this.accordianTitleActive.isBirthYearClassActive = true;
      this.birthYear.map((data: any) => {
        if (
          data.name !== selectedItem.name ||
          data.title !== selectedItem.title
        ) {
          data.checked = false;
        }
      });

      if (this.birthYear.every((option: any) => !option.checked)) {
        this.accordianTitleActive.isBirthYearClassActive = false;
      }
    }

    // this.filterFormValue();
  }

  filterFormValue() {
    this.paginationClicked = false;

    this.filteredData = this.tableData.filter((data: any) => {
      const matchesMovies =
        !this.filterFormValues.movies ||
        data.filmNames.includes(this.filterFormValues.movies);
      const matchesStarships =
        !this.filterFormValues.starships ||
        data.starshipsNames.includes(this.filterFormValues.starships);
      const matchesSpecies =
        !this.filterFormValues.species ||
        data.speciesNames.includes(this.filterFormValues.species);
      const matchesVehicles =
        !this.filterFormValues.vehicles ||
        data.vehiclesNames.includes(this.filterFormValues.vehicles);
      const matchesBirthYear =
        !this.filterFormValues.birthYear ||
        data.birth_year === this.filterFormValues.birthYear;
      return (
        matchesMovies &&
        matchesStarships &&
        matchesSpecies &&
        matchesVehicles &&
        matchesBirthYear
      );
    });

    this.filteredData.length === 0
      ? (this.isNoDataFound = true)
      : (this.isNoDataFound = false);
  }
}
