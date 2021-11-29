import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service'

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass']
})
export class GroupsComponent implements OnInit {
  displayedColumns: string[] = ['id' ,'name', 'reading_ids'];
  dataSource: MatTableDataSource<Group> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<Group>;

  constructor(private groupService: GroupService) { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.groupService.getAll().subscribe(
      data => {
        this.dataSource.data = data
      },
      error => {
        console.log(error);
      }
    )
    this.matTable.renderRows()
  }

  getAllGroupss(){
    this.groupService.getAll().subscribe(
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

}
