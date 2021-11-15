import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Reading } from 'src/app/models/reading.model';
import { ReadingService } from 'src/app/services/reading.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit {

  readings!:  Reading[];
  currentReading: Reading = {};

  displayedColumns: string[] = ['select','id' ,'patient number', 'date', 'laterality', 'show graph', 'add to group', 'comments'];
  dataSource: MatTableDataSource<Reading> = new MatTableDataSource();
  selection_subject = new SelectionModel<Reading>(true, []);
  selection_lymphedema = new SelectionModel<Reading>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<Reading>;

  constructor(private readingService: ReadingService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.readingService.getAll().subscribe(
      data => {
        console.log(data)
        this.dataSource.data = data
      },
      error => {
        console.log(error);
      }
    )
    this.matTable.renderRows()
  }
  openDialog(id: number) {
    this.readingService.get(id).subscribe(
      reading_data => {
        const dialogRef = this.dialog.open(ReadingDialog, {
          data: reading_data,
          disableClose: true,
          autoFocus: true,
          width: '400px',
        });
        dialogRef.afterClosed().subscribe(
          output_data => {
            this.readingService.put(output_data, id)
            window.location.reload()
          }
        )
    })
  }

  getAllReadings(){
    this.readingService.getAll().subscribe(
      data => {
        console.log(data)
        return data
      },
      error => {
        console.log(error);
      }
    )
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
    checkboxLabelSubject(row?: Reading): string {
      if (!row) {
        return `${this.isAllSelectedSubject() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection_subject.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

    /** The label for the checkbox on the passed row */
    checkboxLabelLymphedema(row?: Reading): string {
      if (!row) {
        return `${this.isAllSelectedLymphedema() ? 'deselect' : 'select'} all`;
      }
      return `${this.selection_lymphedema.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    }

}

@Component({
  selector: 'reading-dialog',
  templateUrl: 'reading-dialog.html',
  styleUrls: ['./home.component.sass'],
})
export class ReadingDialog {
  id: string
  patient_no: string | undefined
  date_created: Date | undefined
  laterality: string | undefined
  comments: string | undefined

  form!: FormGroup

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<ReadingDialog>, @Inject(MAT_DIALOG_DATA) public data: Reading) {
    this.id = data.id
    this.patient_no = data.patient_no
    this.date_created = data.date_created
    this.laterality = data.laterality
    this.comments = data.comments
  }

  ngOnInit() {
    this.form = this.fb.group({
        id: [this.id, []],
        patient_no: [this.patient_no, []],
        date_created: [this.date_created, []],
        laterality: [this.laterality, []],
        comments: [this.comments, []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },
};
