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
import { AuthService } from '../../../../core/services/auth.service';
import { iUser } from '../../../../core/interfaces/iUser.interface';

@Component({
  selector: 'app-create-account.page',
  imports: [RouterLink, ReactiveFormsModule, FormsModule, NzFormModule, NzInputModule, NzSelectModule, NzGridModule, NzDatePickerModule, NzRadioModule, NzCheckboxModule, NzButtonModule, NzIconModule, NzInputNumberModule, NzTypographyModule, NzFlexModule],
  templateUrl: './create-account.page.component.html',
  styleUrl: './create-account.page.component.css'
})
export class CreateAccountPageComponent {

  loadingService = inject(LoadingService);
  isLoading = false;

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    usr_first_name: this.fb.control('', [Validators.required]),
    usr_last_name: this.fb.control('', [Validators.required]),
    usr_phone: this.fb.control('', [Validators.required]),
    usr_email: this.fb.control('', [Validators.required, Validators.email]),
    usr_password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    usr_password_confirmation: this.fb.control('', [Validators.required])
  });

  constructor(private authService: AuthService) { }


  submitForm() {
    if (this.validateForm.valid) {
      this.isLoading = true;

      this.authService.register(this.validateForm.value as iUser).subscribe({
        next: () => {
          console.log('user created');
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.isLoading = false;
          // Adicione tratamento de erro visual aqui
        }
      });
    } else {
      // resto do código...
    }
  }
}
