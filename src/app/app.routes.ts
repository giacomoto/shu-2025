import { Routes } from '@angular/router';
import { OnboardingComponent } from './onboarding/onboarding';
import { SplashComponent } from './splash/splash';
import { MainAppComponent } from './main-app/main-app';
import { CitizenComponent } from './citizen/citizen';
import { LanguageSelectComponent } from './language-select/language-select';

export const routes: Routes = [
  { path: '', redirectTo: '/splash', pathMatch: 'full' },
  { path: 'splash', component: SplashComponent },
  { path: 'language', component: LanguageSelectComponent },
  { path: 'onboarding', component: OnboardingComponent },
  { path: 'main', component: MainAppComponent },
  { path: 'citizen', component: CitizenComponent },
];
