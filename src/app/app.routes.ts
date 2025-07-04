import { Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding';
import { SplashComponent } from './splash/splash';
import { MainAppComponent } from './main-app/main-app';

export const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'main', component: MainAppComponent },
];
