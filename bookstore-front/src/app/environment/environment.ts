export interface LanguageConfig {
  code: string;
  name: string;
  countryCode: string; // Código do país para a bandeira
}

export const environment = {
  production: false,
  apiUrl: 'https://wheat-porpoise-135321.hostingersite.com/api',

  // Configuração dinâmica dos idiomas
  languages: [
    { code: 'en', name: 'English', countryCode: 'gb' },
    { code: 'pt-BR', name: 'Português (BR)', countryCode: 'br' },

    { code: 'de', name: 'Deutsch', countryCode: 'de' },
    { code: 'es', name: 'Español', countryCode: 'es' },
    { code: 'fr', name: 'Français', countryCode: 'fr' },
    { code: 'it', name: 'Italiano', countryCode: 'it' },
    { code: 'ja', name: '日本語', countryCode: 'jp' },
    { code: 'pt-PT', name: 'Português (PT)', countryCode: 'pt' },
  ] as LanguageConfig[],

  // Helper para obter o mapa de idiomas (mantém compatibilidade)
  get availableLanguageMap(): { [key: string]: string } {
    return this.languages.reduce((acc, lang) => {
      acc[lang.code] = lang.name;
      return acc;
    }, {} as { [key: string]: string });
  },

  // Helper para obter array de códigos (mantém compatibilidade)
  get availableLanguages(): string[] {
    return this.languages.map(lang => lang.code);
  }
};