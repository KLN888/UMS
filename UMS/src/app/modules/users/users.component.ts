import { Component, OnInit, ViewChild } from '@angular/core';
import {  MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['position', 'name'];
  dataSource:any = [{position:"role1",name:"jhon"}];

  ngOnInit(): void {
   this.dataSource.sort = this.sort;
   this.dataSource.paginator = this.paginator;
   
  }

  applyFilter(event:any) {
    let filterValue:any = event.target.value;
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  
}
