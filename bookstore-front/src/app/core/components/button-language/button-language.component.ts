import { Component, OnInit } from '@angular/core';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { environment, LanguageConfig } from '../../../environment/environment';
import { TranslocoService } from '@jsverse/transloco';
import { KeyValuePipe } from '@angular/common';

@Component({
  selector: 'app-button-language',
  imports: [NzDropDownModule, NzIconModule],
  templateUrl: './button-language.component.html',
  styleUrl: './button-language.component.css',
})
export class ButtonLanguageComponent implements OnInit {
  environment = environment;
  defaultLang: string = 'en';
  languages: LanguageConfig[] = environment.languages;

  constructor(private translocoService: TranslocoService) {}

  ngOnInit() {
    this.defaultLang = this.translocoService.getActiveLang();
  }

  changeLanguage(langCode: string) {
    this.translocoService.setActiveLang(langCode);
    this.defaultLang = langCode;
  }

  getCountryCode(langCode: string): string {
    const language = this.languages.find(lang => lang.code === langCode);
    return language ? language.countryCode : langCode.toLowerCase();
  }

  getCurrentLanguage(): LanguageConfig | undefined {
    return this.languages.find(lang => lang.code === this.defaultLang);
  }
}