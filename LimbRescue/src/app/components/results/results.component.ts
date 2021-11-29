import { SelectionModel } from '@angular/cdk/collections';
import {AfterViewInit, Component, ViewChild, OnInit} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { MatTable } from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { Result } from 'src/app/models/result.model';
import { ResultService } from 'src/app/services/result.service';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements AfterViewInit {

  displayedColumns: string[] = ['group name','date ran', 'algorithm', 'train accuracy', 'test accuracy'];
  dataSource: MatTableDataSource<Result> = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild(MatTable) matTable!: MatTable<Result>;

  constructor(private resultService: ResultService) {

  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit() {
    this.resultService.getAll().subscribe(
      data => {
        this.dataSource.data = data
      },
      error => {
        console.log(error);
      }
    )
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
