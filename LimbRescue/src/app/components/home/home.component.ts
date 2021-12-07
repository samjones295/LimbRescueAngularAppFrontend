import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ViewChild, Inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Reading } from 'src/app/models/reading.model';
import { Group } from 'src/app/models/group.model'
import { ReadingService } from 'src/app/services/reading.service';
import { GroupService } from 'src/app/services/group.service'
import { GroupReadingService } from 'src/app/services/group-reading.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupReading } from 'src/app/models/group-reading.model';
import { Router } from '@angular/router';
import { timer } from 'rxjs';


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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements AfterViewInit {
  readings!:  Reading[];
  currentReading: Reading = {};
  reading_duration = 30;
  show_spinner = false;
  time_left!: number;
  time_passed!: number;
  value!: number;

  readings_sub: any;
  reading_by_id_sub: any;
  group_by_name_sub: any;
  group_create_sub: any;
  reading_update_sub: any;
  date_and_time_sub: any;
  update_dialog_ref_sub: any;
  create_dialog_ref_sub: any;
  post_sub: any;
  timer_sub: any;

  displayedColumns: string[] = ['select','id' ,'patient number', 'date', 'laterality', 'show graph', 'comments'];
  dataSource: MatTableDataSource<Reading> = new MatTableDataSource();
  selection_subject = new SelectionModel<Reading>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<Reading>;


  constructor(private router: Router, private readingService: ReadingService, private groupService: GroupService, private groupReadingService: GroupReadingService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    const sortState: Sort = {active: 'id', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  ngAfterViewInit() {
    this.readings_sub = this.readingService.getAll().subscribe(
      data => {
        this.dataSource.data = data
      },
      error => {
        console.log(error);
      }
    )
    this.matTable.renderRows()
  }

  ngOnDestroy() {
    if(this.readings_sub != undefined){
      this.readings_sub.unsubscribe()
    }
    if(this.reading_by_id_sub != undefined){
      this.reading_by_id_sub.unsubscribe()
    }
    if(this.group_by_name_sub != undefined){
      this.group_by_name_sub.unsubscribe()
    }
    if(this.group_create_sub != undefined){
      this.group_create_sub.unsubscribe()
    }
    if(this.reading_update_sub != undefined){
      this.reading_update_sub.unsubscribe()
    }
    if(this.date_and_time_sub != undefined){
      this.date_and_time_sub.unsubscribe()
    }
    if(this.update_dialog_ref_sub != undefined){
      this.update_dialog_ref_sub.unsubscribe()
    }
    if(this.create_dialog_ref_sub != undefined){
      this.create_dialog_ref_sub.unsubscribe()
    }
    if(this.post_sub != undefined){
      this.post_sub.unsubscribe()
    }
  }

  openUpdateReadingDialog(id: number) {
    this.reading_by_id_sub = this.readingService.getById(id).subscribe(
      reading_data => {
        const dialogRef = this.dialog.open(UpdateReadingDialog, {
          data: reading_data,
          disableClose: true,
          autoFocus: true,
          width: '400px',
        });
        this.update_dialog_ref_sub = dialogRef.afterClosed().subscribe(
          output_data => {
            if(output_data != undefined){
              this.reading_update_sub = this.readingService.put(output_data, id).subscribe(response => {
              this.readings_sub = this.readingService.getAll().subscribe(data => {
                this.dataSource.data = data
                this.matTable.renderRows()
              })
              })
            }
          }
        )
    })
  }

  openCreateGroupFromReadingsDialog() {
    let selected_subjects = this.getSelectedSubjects()
    let subject_ids = this.getSelectionArrayIds(selected_subjects)

    let group = new Group()
    group.reading_ids = subject_ids

    const dialogRef = this.dialog.open(CreateGroupFromReadingsDialog, {
      data: group,
      disableClose: true,
      autoFocus: true,
      width: '500px',
    });
    this.create_dialog_ref_sub = dialogRef.afterClosed().subscribe(
      output_data => {
        if(output_data != undefined){
          output_data.id = 1
          this.post_sub = this.groupService.post(output_data).subscribe(data => {
            console.log(data)
            this.group_by_name_sub = this.groupService.get_by_name(output_data.name).subscribe(result => {
              let reading_id_arr = result.reading_ids!.split(",").map(Number)
              let groupReading = new GroupReading()
              groupReading.id = 1
              groupReading.group_id = result.id
              for(let num of reading_id_arr){
                groupReading.reading_id = num
                this.group_create_sub = this.groupReadingService.post(groupReading).subscribe(data => {})
              }
            })
          })
        }
        this.selection_subject.clear()
      }
    )
  }

  startReading(){
    this.date_and_time_sub = this.readingService.getDateAndtime(parseInt(String(this.reading_duration))*1000).subscribe(time => {console.log(time)})
    let timer_var = timer(0, 1000)
    let timer_length = parseInt(String(this.reading_duration))+3
    this.show_spinner = true
    this.timer_sub = timer_var.subscribe(val => {
      this.time_passed = val
      this.time_left = timer_length-val
      this.value = parseInt(String((this.time_passed/(timer_length-1))*100), 10)
      console.log(this.value)
      if(this.time_left == 0){
        this.timer_sub.unsubscribe()
        this.show_spinner = false
      }
    })
  }

  showGraph(id: number, lat: string){
    this.router.navigate(['/graph'], { queryParams: {reading_id: id, laterality: lat}})
  }

  // Table filtering and selectiing below
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
  
  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggleSubject() {
    if (this.isAllSelectedSubject()) {
      this.selection_subject.clear();
      return;
    }

    this.selection_subject.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabelSubject(row?: Reading): string {
    if (!row) {
      return `${this.isAllSelectedSubject() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection_subject.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
  }

  getSelectedSubjects() {
    return this.selection_subject.selected
  }
  
  getSelectionArrayIds(arr: Array<Reading>){
    let reading_ids = ''
    arr.forEach(item => reading_ids+=item.id+',')
    reading_ids = reading_ids.substring(0,reading_ids.length - 1)
    return reading_ids
  }
}


///////////////////////////////////////////////
////         Update Reading Dialog         ////
///////////////////////////////////////////////

@Component({
  selector: 'update-reading-dialog',
  templateUrl: 'update-reading-dialog.html',
  styleUrls: ['./home.component.sass'],
})
export class UpdateReadingDialog {
  id: string
  patient_no: string | undefined
  date_created: Date | undefined
  laterality: string | undefined
  comments: string | undefined

  form!: FormGroup

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<UpdateReadingDialog>, @Inject(MAT_DIALOG_DATA) public data: Reading) {
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

///////////////////////////////////////////////
////   Create Group From Selected Dialog   ////
///////////////////////////////////////////////
@Component({
  selector: 'create-group-from-readings-dialog',
  templateUrl: 'create-group-from-readings-dialog.html',
  styleUrls: ['./home.component.sass'],
})
export class CreateGroupFromReadingsDialog {
  id: number | undefined
  name: string | undefined
  reading_ids: string | undefined

  form!: FormGroup

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateGroupFromReadingsDialog>, @Inject(MAT_DIALOG_DATA) public data: Group) {
    this.id = data.id
    this.name = data.name
    this.reading_ids = data.reading_ids
  }

  ngOnInit() {
    this.form = this.fb.group({
        id: [this.id, []],
        name: [this.name, []],
        reading_ids: [this.reading_ids, []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}