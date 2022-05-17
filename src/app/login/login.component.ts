import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NgxSpinnerService } from 'ngx-spinner';
declare var $: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  password: any = ""
  username: any = ""
  typeSelected: string;
  user;
  constructor(
    public router: Router,
    private http: HttpClient,
    private spinnerService: NgxSpinnerService,
  ) { 
    this.typeSelected = 'ball-fussion';
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  /*
    This method starts the login when the enter key is pressed.
  */
    onKeydown(event) {
      this.login();
    }

  login(){
    let self = this;
    this.spinnerService.show();
    this.http.post(`${environment.testApi}/user/login`, {
      username: this.username,
      pass: this.password
    }).subscribe(
      data => {
        console.log(data);
        this.spinnerService.hide()
        if (data) {
          localStorage.setItem('session', JSON.stringify(data['user'][0]));          
          if (JSON.parse(localStorage.getItem('session'))['fk_userType'] === 1) {
            self.router.navigateByUrl('/dashboard');
          } else {
            self.router.navigateByUrl('/event');
          }
        } else {
          self.showNotification('bottom','right', 'Credentials no valid', 'danger', 10);
          self.spinnerService.hide();
        }
      },
      error => {
        console.log("Error, http post method wrong");
        this.spinnerService.hide()
      }
    );
  }

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
