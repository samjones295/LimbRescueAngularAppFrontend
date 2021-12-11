import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Group } from 'src/app/models/group.model';
import { GroupService } from 'src/app/services/group.service'

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.sass']
})
export class GroupsComponent implements OnInit {
  // The columns that will be displayed on the  results table
  displayedColumns: string[] = ['id' ,'name', 'reading_ids'];

  // Where the data will be stored
  dataSource: MatTableDataSource<Group> = new MatTableDataSource();

  // The subscription for where the data will be stored
  groups_sub: any;

  // Initialize table elements
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<Group>;

  constructor(private groupService: GroupService) { }

  // Called when the page is created
  ngOnInit() {
    // Set the  table elements to  the initialized one
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // Set up the sort element
    const sortState: Sort = {active: 'id', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

  // Called when the page is left
  ngOnDestroy(){
    // Unsubscribe from subscription
    if(this.groups_sub != undefined){
      this.groups_sub.unsubscribe()
    }
  }

  // Called after the page has been initialized
  ngAfterViewInit() {
    // Get all of the groups and set it to the datasource
    this.groups_sub = this.groupService.getAll().subscribe(
      data => {
        this.dataSource.data = data
      })

    // rerender the table
    this.matTable.renderRows()
  }

  // Called in the search box
  applyFilter(event: Event) {
    // filter the table
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
