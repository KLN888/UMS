import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-umdashboard',
  templateUrl: './umdashboard.component.html',
  styleUrls: ['./umdashboard.component.scss']
})
export class UMDashboardComponent implements OnInit {

  toggleSideMenu:boolean = true;


  ngOnInit(): void {
  }

  
  toggleSideBar(){
   this.toggleSideMenu = !this.toggleSideMenu;   
  }
  
}
