import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonLanguageComponent } from "../../components/button-language/button-language.component";

@Component({
  selector: 'app-dashboard.layout',
  imports: [RouterOutlet, ButtonLanguageComponent],
  templateUrl: './dashboard.layout.component.html',
  styleUrl: './dashboard.layout.component.css'
})
export class DashboardLayoutComponent {

}
