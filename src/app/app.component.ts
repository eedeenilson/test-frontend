import { Component} from '@angular/core';
import { AngularFaviconService } from 'angular-favicon';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(
    private ngxFavicon: AngularFaviconService
    ) { 
      this.ngxFavicon.setFavicon("../assets/img/favicon2.png");
    }
}
