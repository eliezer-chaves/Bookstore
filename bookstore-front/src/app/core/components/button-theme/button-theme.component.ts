import { Component } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-button-theme',
  imports: [NzButtonModule],
  templateUrl: './button-theme.component.html',
  styleUrl: './button-theme.component.css',
})
export class ButtonThemeComponent {
  isLight = true;

  constructor(private theme: ThemeService) {
    this.isLight = this.theme.getCurrentTheme() === 'light';
  }

  toggleTheme() {
    this.theme.toggle();
    this.isLight = !this.isLight;
  }
}
