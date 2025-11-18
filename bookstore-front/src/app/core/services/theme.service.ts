import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ThemeService {
    private themeKey = 'app-theme';
    private currentTheme: 'light' | 'dark' = 'light';

    constructor() {
        this.loadInitialTheme();
    }

    private loadInitialTheme(): void {
        const saved = localStorage.getItem(this.themeKey);

        if (saved === 'light' || saved === 'dark') {
            this.setTheme(saved);
            return;
        }

        // Caso não tenha nada salvo → segue o tema do sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        this.setTheme(prefersDark ? 'dark' : 'light');
    }

    setTheme(theme: 'light' | 'dark'): void {
        this.currentTheme = theme;

        const html = document.documentElement;

        if (theme === 'dark') {
            html.classList.add('dark');
            html.classList.remove('light');
        } else {
            html.classList.add('light');
            html.classList.remove('dark');
        }

        localStorage.setItem(this.themeKey, theme);
    }

    toggle(): void {
        this.setTheme(this.currentTheme === 'light' ? 'dark' : 'light');
    }

    getCurrentTheme(): 'light' | 'dark' {
        return this.currentTheme;
    }

}
