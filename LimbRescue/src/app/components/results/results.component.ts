import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

export interface ResultsData {
  group_name: string;
  date_ran: string;
  algorithm_ran: string;
}

/** Constants used to fill up our data base. */
const GROUPS: string[] = [
  'Group 1', 'Group 2', 'Group 3', 'Group 4', 'Group 5', 'Group 6', 'Group 7', 'Group 8'
];

const ALGORITHMS: string[] = [
  'Algorithm 1', 'Algorithm 2', 'Algorithm 3', 'Algorithm 4', 'Algorithm 5', 'Algorithm 6', 'Algorithm 7', 'Algorithm 8'
];

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements AfterViewInit {

  displayedColumns: string[] = ['group name','date ran', 'algorithm ran', 'view report'];
  dataSource: MatTableDataSource<ResultsData> = new MatTableDataSource();
  selection = new SelectionModel<ResultsData>(true, []);
  users = Array.from({length: 100}, (_, k) => createNewUser());

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<ResultsData>;

  constructor() {

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.data = this.users;
    this.matTable.renderRows()
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}

function createNewUser(): ResultsData {
  const group = GROUPS[Math.round(Math.random() * (GROUPS.length - 1))];
  const algorithm = ALGORITHMS[Math.round(Math.random() * (GROUPS.length - 1))];

  return {
    group_name: group,
    date_ran: Math.round(0.5+ Math.random() * 12).toString()+'/'+Math.round(0.5+ Math.random() * 31).toString()+'/'+Math.round(2012.5+ Math.random() * 9).toString(),
    algorithm_ran: algorithm
  };
}