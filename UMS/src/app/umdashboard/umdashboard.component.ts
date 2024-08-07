import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-umdashboard',
  templateUrl: './umdashboard.component.html',
  styleUrls: ['./umdashboard.component.scss']
})
export class UMDashboardComponent implements OnInit {

  toggleSideMenu:boolean = true;

  constructor(public router:Router){}

  ngOnInit(): void {
  }

  
  toggleSideBar(){
   this.toggleSideMenu = !this.toggleSideMenu;   
  }

  navigate(name:any){
   return this.router.navigate([name]);
  }
  
}
