import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild, Inject} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { Reading } from 'src/app/models/reading.model';
import { Group } from 'src/app/models/group.model'
import { ReadingService } from 'src/app/services/reading.service';
import { GroupService } from 'src/app/services/group.service'
import { GroupReadingService } from 'src/app/services/group-reading.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GroupReading } from 'src/app/models/group-reading.model';
import { Router } from '@angular/router';


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

  displayedColumns: string[] = ['select','id' ,'patient number', 'date', 'laterality', 'show graph', 'comments'];
  dataSource: MatTableDataSource<Reading> = new MatTableDataSource();
  selection_subject = new SelectionModel<Reading>(true, []);
  //selection_lymphedema = new SelectionModel<Reading>(true, []);

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<Reading>;


  constructor(private router: Router, private readingService: ReadingService, private groupService: GroupService, private groupReadingService: GroupReadingService, public dialog: MatDialog) {}

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.readingService.getAll().subscribe(
      data => {
        this.dataSource.data = data
      },
      error => {
        console.log(error);
      }
    )
    this.matTable.renderRows()
  }



  openUpdateReadingDialog(id: number) {
    this.readingService.getById(id).subscribe(
      reading_data => {
        const dialogRef = this.dialog.open(UpdateReadingDialog, {
          data: reading_data,
          disableClose: true,
          autoFocus: true,
          width: '400px',
        });
        dialogRef.afterClosed().subscribe(
          output_data => {
            if(output_data != undefined){
              this.readingService.put(output_data, id)
              window.location.reload()
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
    dialogRef.afterClosed().subscribe(
      output_data => {
        if(output_data != undefined){
          output_data.id = 0
          let response = this.groupService.post(output_data)
          response.subscribe(data => {
            this.groupService.get_by_name(output_data.name).subscribe(result => {
              let reading_id_arr = result.reading_ids!.split(",").map(Number)
              let groupReading = new GroupReading()
              groupReading.id = 0
              groupReading.group_id = result.id
              for(let num of reading_id_arr){
                groupReading.reading_id = num
                this.groupReadingService.post(groupReading).subscribe(data => {})
              }
            })
          })
        }
      }
    )
  }

  openAddReadingsToExistingGroupDialog() {
    let selected_subjects = this.getSelectedSubjects()
    let subject_ids = this.getSelectionArrayIds(selected_subjects)

    let group = new Group()
    group.reading_ids = subject_ids
    this.groupService.getAll().subscribe(groups_array => {
      let groups = groups_array
      const dialogRef = this.dialog.open(AddReadingsToExistingGroupDialog, {
        data: {group, groups},
        disableClose: true,
        autoFocus: true,
        width: '500px',
      });
      dialogRef.afterClosed().subscribe(
        output_data => {
          if(output_data != undefined){
            this.groupService.get_by_name(output_data.name).subscribe(data => {
              let current_ids = data.reading_ids!.split(",").map(Number).sort()
              let new_ids =  output_data.reading_ids.split(",").map(Number).sort()
              let combined_ids = current_ids.concat(new_ids.filter((item: any) => current_ids.indexOf(item) < 0))
              let new_group = new Group()

              new_group.id = data.id
              new_group.name = data.name
              new_group.reading_ids = combined_ids.toString()

              this.groupService.put(new_group, data.id!).subscribe(result => {
                let groupReading = new GroupReading()
                groupReading.id = 0
                groupReading.group_id = data.id
                for(let num of combined_ids){
                  groupReading.reading_id = num
                  this.groupReadingService.post(groupReading).subscribe(data => {})
                }
              })
              
            })
          }
        }
      )
    })
  }

  showGraph(id: number, lat: string){
    this.router.navigate(['/graph'], { queryParams: {reading_id: id, laterality: lat}})
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

    // /** Whether the number of selected elements matches the total number of rows. */
    // isAllSelectedLymphedema() {
    //   const numSelected = this.selection_lymphedema.selected.length;
    //   const numRows = this.dataSource.data.length;
    //   return numSelected === numRows;
    //   }

    // /** Selects all rows if they are not all selected; otherwise clear selection. */
    // masterToggleLymphedema() {
    //   if (this.isAllSelectedLymphedema()) {
    //     this.selection_lymphedema.clear();
    //     return;
    //   }
  
    //   this.selection_lymphedema.select(...this.dataSource.data);
    // }
  
    // /** The label for the checkbox on the passed row */
    // checkboxLabelLymphedema(row?: Reading): string {
    //   if (!row) {
    //     return `${this.isAllSelectedLymphedema() ? 'deselect' : 'select'} all`;
    //   }
    //   return `${this.selection_lymphedema.isSelected(row) ? 'deselect' : 'select'} row ${row.id + 1}`;
    // }

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

///////////////////////////////////////////////////
////   Add Readings to Existing Group Dialog   ////
///////////////////////////////////////////////////
@Component({
  selector: 'add-readings-to-existing-group-dialog',
  templateUrl: 'add-readings-to-existing-group-dialog.html',
  styleUrls: ['./home.component.sass'],
})
export class AddReadingsToExistingGroupDialog {
  id: number | undefined
  name: string | undefined
  reading_ids: string | undefined
  groups: Group[]

  form!: FormGroup

  constructor(private fb: FormBuilder, private dialogRef: MatDialogRef<CreateGroupFromReadingsDialog>, @Inject(MAT_DIALOG_DATA) public data : any) {
    this.id = data.group.id
    this.name = data.group.name
    this.reading_ids = data.group.reading_ids
    this.groups = data.groups
  }

  ngOnInit() {
    this.form = this.fb.group({
        id: [this.id, []],
        name: [this.name, []],
        reading_ids: [this.reading_ids, []],
        groups: [this.groups, []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }
}
