import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ReactiveFormsModule, FormsModule, NonNullableFormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AsyncPipe } from '@angular/common'; // <--- IMPORTANTE: Adicionado
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
import { iUserRegister } from '../../../../core/interfaces/iUser.interface';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';
import { NzDividerComponent } from 'ng-zorro-antd/divider';
import { ButtonLanguageComponent } from '../../../../core/components/button-language/button-language.component';
import { ButtonThemeComponent } from '../../../../core/components/button-theme/button-theme.component';
import { IntlTelInputComponent } from "intl-tel-input/angularWithUtils";
import { map, merge, Observable, of, startWith, switchMap, timer } from 'rxjs';

@Component({
  selector: 'app-create-account.page',
  standalone: true,
  imports: [
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    AsyncPipe,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzGridModule,
    NzDatePickerModule,
    NzRadioModule,
    NzCheckboxModule,
    NzButtonModule,
    NzIconModule,
    NzInputNumberModule,
    NzTypographyModule,
    NzFlexModule,
    TranslocoModule,
    NzDividerComponent,
    ButtonLanguageComponent,
    ButtonThemeComponent,
    IntlTelInputComponent
  ],
  templateUrl: './create-account.page.component.html',
  styleUrl: './create-account.page.component.css'
})
export class CreateAccountPageComponent implements OnInit {
  @ViewChild('telInput') telInput!: IntlTelInputComponent;

  loadingService = inject(LoadingService);
  private translocoService = inject(TranslocoService);
  isLoading = false;

  private fb = inject(NonNullableFormBuilder);

  validateForm = this.fb.group({
    usr_first_name: this.fb.control('', [Validators.required]),
    usr_last_name: this.fb.control('', [Validators.required]),
    usr_phone: this.fb.control('', [Validators.required, this.phoneValidator.bind(this)]),
    usr_email: this.fb.control('', [Validators.required, Validators.email]),
    usr_password: this.fb.control('', [Validators.required, Validators.minLength(6)]),
    usr_password_confirmation: this.fb.control('', [Validators.required, this.passwordMatchValidator.bind(this)])
  });

  phoneNumber: string = '';
  isPhoneValid: boolean = false;

  public telInputOptions$!: Observable<any>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.telInputOptions$ = this.translocoService.langChanges$.pipe(
      startWith(this.translocoService.getActiveLang()),

      switchMap(() => {
     
        return merge(
          of(null), 
          timer(100).pipe( 
            switchMap(() =>
              this.translocoService.selectTranslateObject('domain.auth.components.phoneInput')
            )
          )
        );
      }),

      map((translations) => {
        if (!translations) return null; 

        return {
          initialCountry: 'br',
          strictMode: true,
          formatAsYouType: true,
          showFlags: true,
          separateDialCode: true,
          placeholderNumberType: 'MOBILE',
          autoPlaceholder: 'aggressive',
          containerClass: 'intl-tel-input-container',
          countryOrder: ['br', 'us'],
          useFullscreenPopup: false,
          dropdownContainer: null,
          i18n: translations 
        };
      })
    );
  }

  // Validador customizado para telefone
  phoneValidator(control: any) {
    if (!control.value) {
      return null;
    }

    if (!this.isPhoneValid) {
      return { invalidPhone: true };
    }

    return null;
  }

  // Validador para confirmar senha
  passwordMatchValidator(control: any) {
    const password = this.validateForm?.get('usr_password')?.value;
    const confirmPassword = control.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordMismatch: true };
    }

    return null;
  }

  handleNumberChange(event: any) {
    //console.log('Número completo (E164):', event);
    this.phoneNumber = event;

    this.validateForm.patchValue({
      usr_phone: event
    });

    this.validateForm.get('usr_phone')?.updateValueAndValidity();
  }

  handleValidityChange(isValid: boolean) {
    //console.log('Telefone válido:', isValid);
    this.isPhoneValid = isValid;

    this.validateForm.get('usr_phone')?.updateValueAndValidity();
  }

  handleCountryChange(event: any) {
    //console.log('País alterado:', event);
  }

  submitForm() {
    Object.keys(this.validateForm.controls).forEach(key => {
      const control = this.validateForm.get(key);
      control?.markAsTouched();
      control?.updateValueAndValidity();
    });

    if (this.validateForm.valid) {
      this.isLoading = true;

      const formData = {
        ...this.validateForm.value,
        usr_phone: this.phoneNumber
      };

      this.authService.register(formData as iUserRegister).subscribe({
        next: () => {
          console.log('Usuário criado com sucesso');
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro no registro:', err);
          this.isLoading = false;
        }
      });
    } else {
      console.log('Formulário inválido', this.validateForm.errors);
    }
  }
}