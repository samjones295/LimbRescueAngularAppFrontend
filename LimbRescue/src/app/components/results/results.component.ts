import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Result } from 'src/app/models/result.model';
import { ResultService } from 'src/app/services/result.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements AfterViewInit {
  // The columns that will be displayed
  displayedColumns: string[] = ['id', 'group name','date ran', 'algorithm', 'train accuracy', 'test accuracy'];
  
  // Create the data source
  dataSource: MatTableDataSource<Result> = new MatTableDataSource();

  // Define a subscription for the results
  results_sub: any;

  // Initialize table elements
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<Result>;

  constructor(private resultService: ResultService) {}

  // Called on page loag
  ngOnInit() {
    // set the datasource parameters do the table elements
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;

    // initialize the sort element
    const sortState: Sort = {active: 'id', direction: 'desc'};
    this.sort.active = sortState.active;
    this.sort.direction = sortState.direction;
    this.sort.sortChange.emit(sortState);
  }

// Called after the page has initialized
  ngAfterViewInit() {
    // Get all of the results
    this.results_sub = this.resultService.getAll().subscribe(
      data => {
        this.dataSource.data = data
      })
    // Rerender the table
    this.matTable.renderRows()
  }

  // Called when the page is left
  ngOnDestroy() {
    // Unsubscribe from the results subscription to  prevent resource leaks
    if(this.results_sub != undefined) {
      this.results_sub.unsubscribe()
    }
  }

  // Called when the  search box is  used
  applyFilter(event: Event) {
    // Filter the table based on the search value
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
}
