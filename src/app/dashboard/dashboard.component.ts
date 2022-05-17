import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  usr;
  money = 5000;
  events = [];
  constructor(
    private http: HttpClient,
    public router: Router
  ) { 
    
  }
  
  ngOnInit() {

    if(JSON.parse(localStorage.getItem('session')) != null){
      if(JSON.parse(localStorage.getItem('session'))['fk_userType'] != 1){
        this.router.navigateByUrl('/event');
      }else{
        this.usr = JSON.parse(localStorage.getItem('session'))['username']
        this.getAllEvents();
      }
    }else{
      this.router.navigateByUrl('/login');
    }
  } 
  
  getAllEvents(){
    this.events = [];
    this.http.get(`${environment.testApi}/event`, {
    }).subscribe(
      data => {
        for (const iterator in data) {
          this.events.push(data[iterator])        
        }
      },
      error => {
        console.log("Error, http get method wrong");
      }
    );
  }
}
