import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-language-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './language-select.html',
  styleUrl: './language-select.css'
})
export class LanguageSelectComponent {
  constructor(private router: Router) {}

  selectLanguage(language: 'it' | 'en') {
    // Store the selected language (you can use localStorage or a service)
    localStorage.setItem('selectedLanguage', language);
    
    // Navigate to onboarding
    this.router.navigate(['/onboarding']);
  }
} 