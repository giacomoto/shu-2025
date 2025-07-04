import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [],
  templateUrl: './splash.html',
  styleUrl: './splash.css'
})
export class SplashComponent {
  constructor(private router: Router) {
    // Auto-navigate to language selection after 3 seconds
    setTimeout(() => {
      this.router.navigate(['/language']);
    }, 3000);
  }
}
