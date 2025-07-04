import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserDataService, OnboardingData } from '../services/user-data';

@Component({
  selector: 'app-onboarding',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './onboarding.html',
  styleUrl: './onboarding.css'
})
export class OnboardingComponent {
  currentStep = 1;
  totalSteps = 3;
  
  onboardingData: OnboardingData = {
    userType: null,
    stayDuration: 1,
    goals: []
  };

  userTypes = [
    { value: 'citizen', label: 'Cittadino', icon: '🏠' },
    { value: 'tourist', label: 'Turista', icon: '🧳' }
  ];

  stayDurationOptions = [
    { value: 1, label: '1 giorno' },
    { value: 2, label: '2 giorni' },
    { value: 3, label: '3 giorni' },
    { value: 4, label: '4 giorni' },
    { value: 5, label: '5 giorni' },
    { value: 6, label: '6 giorni' },
    { value: 7, label: '1 settimana' }
  ];

  availableGoals = [
    'Explore historical monuments',
    'Taste local cuisine',
    'Shop for artisan crafts',
    'Participate in cultural events',
    'Go hiking in nature',
    'Visit wineries and taste wines',
    'Photograph landscapes',
    'Relax and enjoy the atmosphere'
  ];

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {}

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  selectUserType(type: 'citizen' | 'tourist') {
    this.onboardingData.userType = type;
  }

  selectStayDuration(duration: number) {
    this.onboardingData.stayDuration = duration;
  }

  toggleGoal(goal: string) {
    const index = this.onboardingData.goals.indexOf(goal);
    if (index > -1) {
      this.onboardingData.goals.splice(index, 1);
    } else {
      this.onboardingData.goals.push(goal);
    }
  }

  isGoalSelected(goal: string): boolean {
    return this.onboardingData.goals.includes(goal);
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.onboardingData.userType !== null;
      case 2:
        return this.onboardingData.stayDuration !== null;
      case 3:
        return this.onboardingData.goals.length > 0;
      default:
        return false;
    }
  }

  completeOnboarding() {
    console.log('Onboarding completed:', this.onboardingData);
    // Save user data to service
    this.userDataService.setUserData(this.onboardingData);
    // Navigate to main app
    console.log('Attempting to navigate to /main...');
    this.router.navigate(['/main']).then(() => {
      console.log('Navigation successful');
    }).catch((error) => {
      console.error('Navigation failed:', error);
    });
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Who are you?';
      case 2:
        return 'How long are you staying?';
      case 3:
        return 'What do you want to do?';
      default:
        return '';
    }
  }

  getStepDescription(): string {
    switch (this.currentStep) {
      case 1:
        return 'Select your profile to personalize your experience';
      case 2:
        return 'Help us plan your stay better';
      case 3:
        return 'Choose the activities that interest you most';
      default:
        return '';
    }
  }

  onDurationChange(event: any) {
    // Il binding ngModel aggiorna già stayDuration, quindi qui non serve altro
  }

  getDurationDisplay(): string {
    return this.onboardingData.stayDuration?.toString() ?? '';
  }

  getDurationUnit(): string {
    return this.onboardingData.stayDuration === 1 ? 'day' : 'days';
  }
}
