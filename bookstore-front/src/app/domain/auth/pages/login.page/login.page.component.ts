import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
import { LoadingService } from '../../../../shared/services/loading.service';
import { iUserLogin, iUserRegister } from '../../../../core/interfaces/iUser.interface';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-login.page',
  imports: [RouterLink, ReactiveFormsModule, FormsModule, NzFormModule, NzSelectModule, NzGridModule, NzDatePickerModule, NzRadioModule, NzInputModule, NzCheckboxModule, NzButtonModule, NzIconModule, NzInputNumberModule, NzTypographyModule, NzFlexModule],
  templateUrl: './login.page.component.html',
  styleUrl: './login.page.component.css'
})
export class LoginPageComponent {
  loadingService = inject(LoadingService);
  isLoading = false;

  private fb = inject(NonNullableFormBuilder);
  constructor(private authService: AuthService) { }

  validateForm = this.fb.group({
    usr_email: this.fb.control('', [Validators.required]),
    usr_password: this.fb.control('', [Validators.required])
  });

  submitForm() {
    if (this.validateForm.valid) {
      this.isLoading = true;

      const { usr_email, usr_password } = this.validateForm.value;
      if (usr_email && usr_password) {
        this.authService.login(usr_email, usr_password).subscribe({
          next: () => {
            //console.log('Login realizado com sucesso');
            this.isLoading = false;
          },
          error: (err) => {
            //console.error('Login error:', err);
            this.isLoading = false;
            // aqui você pode exibir mensagem de erro no layout
          }
        });
      }

    } else {
      // caso o formulário seja inválido
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) control.markAsDirty();
        control.updateValueAndValidity();
      });
    }
  }

}
