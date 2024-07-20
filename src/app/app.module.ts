import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PeopleDetailsComponent } from './components/people-details/people-details.component';
import { DropdownComponent } from './components/shared/dropdown/dropdown.component';
import { TableComponent } from './components/shared/table/table.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    PeopleDetailsComponent,
    DropdownComponent,
    TableComponent,
    PaginationComponent,
    LoaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
