import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Reading } from 'src/app/models/reading.model';
import { ReadingService } from 'src/app/services/reading.service';

export interface UserData {
  subject_number: string;
  laterality: string;
  date: string;
}

/** Constants used to fill up our data base. */
const LATERALITY: string[] = [
  'Left', 'Right', 'Bilateral'
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit {

  readings?:  Reading[];
  currentReading: Reading = {};

  displayedColumns: string[] = ['select','subject number', 'date', 'lymphadema', 'laterality', 'show graph', 'add to group', 'comments'];
  dataSource: MatTableDataSource<UserData> = new MatTableDataSource();
  selection_subject = new SelectionModel<UserData>(true, []);
  selection_lymphedema = new SelectionModel<UserData>(true, []);
  users = Array.from({length: 100}, (_, k) => createNewUser(k + 1));

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<UserData>;

  constructor(private readingService: ReadingService) {}

  ngOnInit() {
    this.retrieveReadings()
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.dataSource.data = this.users;
    this.matTable.renderRows()
  }

  retrieveReadings() {
    this.readingService.getAll().subscribe(
      data => {
        this.readings = data;
        console.log(data);
      },
      error => {
        console.log(error);
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelectedSubject() {
      const numSelected = this.selection_subject.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }

    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelectedLymphedema() {
      const numSelected = this.selection_lymphedema.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
      }
  
    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggleSubject() {
      if (this.isAllSelectedSubject()) {
        this.selection_subject.clear();
        return;
      }
  
      this.selection_subject.select(...this.dataSource.data);
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    masterToggleLymphedema() {
      if (this.isAllSelectedLymphedema()) {
        this.selection_lymphedema.clear();
        return;
      }
  
      this.selection_lymphedema.select(...this.dataSource.data);
    }
  
    /** The label for the checkbox on the passed row */
    checkboxLabelSubject(row?: UserData): string {
      if (!row) {
        return `${this.isAllSelectedSubject() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection_subject.isSelected(row) ? 'deselect' : 'select'} row ${row.subject_number + 1}`;
    }

    /** The label for the checkbox on the passed row */
    checkboxLabelLymphedema(row?: UserData): string {
      if (!row) {
        return `${this.isAllSelectedLymphedema() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection_lymphedema.isSelected(row) ? 'deselect' : 'select'} row ${row.subject_number + 1}`;
    }

}

function createNewUser(subject_number: number): UserData {
  const laterality = LATERALITY[Math.round(Math.random() * (LATERALITY.length - 1))];

  return {
    subject_number: subject_number.toString(),
    laterality: laterality,
    date: Math.round(0.5+ Math.random() * 12).toString()+'/'+Math.round(0.5+ Math.random() * 31).toString()+'/'+Math.round(2012.5+ Math.random() * 9).toString()
  };
}