import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as moment from 'moment';
declare var $: any;
@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  //Variables
  usr = JSON.parse(localStorage.getItem('session'))['username'];
  locations = [];
  events = [];
  groups = [];
  event = {
    name : "",
    fk_locationId : "",
    event_date : "",
    created_by : JSON.parse(localStorage.getItem('session'))['id']
  };
  group = {
    name : "",
    fk_eventId : "",
    created_by : JSON.parse(localStorage.getItem('session'))['id']
  };
  attendee = {
    name:"",
    identification_number:"",
    fk_groupId:"",
    created_by : JSON.parse(localStorage.getItem('session'))['id']
  };
  //Start of methods and constructor
  constructor(
    public router: Router,
    private http: HttpClient
  ) { }

  /*
    Verify that the session exists
  */
  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem('session')) == null){
      this.router.navigateByUrl('/login');
    }else{
      this.getLocations();
      this.getEvents();
    }
  }

  saveEvent(){
    this.event.event_date = moment(this.event.event_date).format('YYYY-MM-DD HH:mm:ss');
    this.http.post(`${environment.testApi}/event`, this.event).subscribe(
      data => {
        console.log(data);
        this.showNotification('bottom','right', 'Event successfully saved', 'success', 10);
        this.getEvents();
        this.event = {
          name : "",
          fk_locationId : "",
          event_date : "",
          created_by : JSON.parse(localStorage.getItem('session'))['id']
        };
      },
      error => {
        console.log("Error, http post method wrong");
        this.showNotification('bottom','right', 'Event not successfully saved', 'danger', 10);
      }
    );
    
  }

  saveGroup(){
    this.http.post(`${environment.testApi}/group/`, this.group).subscribe(
      data => {
        console.log(data);
        this.showNotification('bottom','right', 'Group successfully saved', 'success', 10);
        this.group = {
          name : "",
          fk_eventId : "",
          created_by : JSON.parse(localStorage.getItem('session'))['id']
        };
      },
      error => {
        console.log("Error, http post method wrong");
        this.showNotification('bottom','right', 'Group not successfully saved', 'danger', 10);
      }
    );
  }

  saveAttendee(){
    this.http.post(`${environment.testApi}/attendee/`, this.attendee).subscribe(
      data => {
        console.log(data);
        this.showNotification('bottom','right', 'Attendee successfully saved', 'success', 10);
        this.attendee = {
          name : "",
          identification_number:"",
          fk_groupId : "",
          created_by : JSON.parse(localStorage.getItem('session'))['id']
        };
      },
      error => {
        console.log("Error, http post method wrong");
        this.showNotification('bottom','right', 'Attendee not successfully saved', 'danger', 10);
      }
    );
  }

  getLocations(){
    this.http.get(`${environment.testApi}/location`, {
    }).subscribe(
      data => {
        for (const iterator in data) {
          this.locations.push(data[iterator])        
        }
      },
      error => {
        console.log("Error, http get method wrong");
      }
    );
  }

  getEvents(){
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

  getGroups(eventId){
    this.groups=[];
    this.http.get(`${environment.testApi}/group/${eventId}`, {
    }).subscribe(
      data => {
        for (const iterator in data) {
          this.groups.push(data[iterator])        
        }
      },
      error => {
        console.log("Error, http get method wrong");
      }
    );
  }

  /*
    This method prints pop alert on screen
    danger --> red
    warning --> yellow
    info --> blue
    success --> green

    Example this.showNotification('bottom','right', 'Saved successfully', 'success', 10);
  */
  showNotification(from, align, message, type, timer){
    $.notify({
        icon: "notifications",
        message: message

    },{
        type: type,
        timer: timer,
        placement: {
            from: from,
            align: align
        },
        template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
          '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
          '<i class="material-icons" data-notify="icon">notifications</i> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>'
    });
}
  
}
