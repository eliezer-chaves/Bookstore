import { Component } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-dashboard.page',
  imports: [],
  templateUrl: './dashboard.page.component.html',
  styleUrl: './dashboard.page.component.css'
})
export class DashboardPageComponent  {
  constructor (private authService: AuthService){}

  logout(){
    this.authService.logout();
  }
}
