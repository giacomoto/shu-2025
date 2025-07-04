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
  totalSteps = 4;
  
  onboardingData: OnboardingData = {
    userType: null,
    stayDuration: 1,
    goals: [],
    accessibilityNeeds: []
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

  accessibilityOptions = [
    { value: 'visual', label: 'Visual impairments', icon: '👁️', description: 'Need larger text, high contrast, or audio descriptions' },
    { value: 'mobility', label: 'Mobility assistance', icon: '♿', description: 'Need wheelchair access, ramps, or mobility support' },
    { value: 'hearing', label: 'Hearing impairments', icon: '👂', description: 'Need captions, sign language, or visual alerts' },
    { value: 'cognitive', label: 'Cognitive support', icon: '🧠', description: 'Need simplified language, clear instructions, or memory aids' },
    { value: 'none', label: 'No special needs', icon: '✅', description: 'I don\'t need any accessibility assistance' }
  ];

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {}

  nextStep() {
    if (this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
    
    // If citizen is selected and we're moving to step 3 (now after userType selection), redirect to citizen app
    if (this.currentStep === 3 && this.onboardingData.userType === 'citizen') {
      console.log('Citizen detected - skipping remaining onboarding and navigating to citizen app...');
      this.userDataService.setUserData(this.onboardingData);
      this.router.navigate(['/citizen']);
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

  toggleAccessibilityNeed(need: string) {
    if (need === 'none') {
      // If "none" is selected, clear all other selections
      this.onboardingData.accessibilityNeeds = ['none'];
    } else {
      // Remove "none" if it was previously selected
      this.onboardingData.accessibilityNeeds = this.onboardingData.accessibilityNeeds.filter(n => n !== 'none');
      
      const index = this.onboardingData.accessibilityNeeds.indexOf(need);
      if (index > -1) {
        this.onboardingData.accessibilityNeeds.splice(index, 1);
      } else {
        this.onboardingData.accessibilityNeeds.push(need);
      }
      
      // If no accessibility needs are selected, default to "none"
      if (this.onboardingData.accessibilityNeeds.length === 0) {
        this.onboardingData.accessibilityNeeds = ['none'];
      }
    }
  }

  isAccessibilityNeedSelected(need: string): boolean {
    return this.onboardingData.accessibilityNeeds.includes(need);
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.onboardingData.accessibilityNeeds.length > 0;
      case 2:
        return this.onboardingData.userType !== null;
      case 3:
        return this.onboardingData.stayDuration !== null;
      case 4:
        return this.onboardingData.goals.length > 0;
      default:
        return false;
    }
  }

  completeOnboarding() {
    console.log('Onboarding completed:', this.onboardingData);
    // Save user data to service
    this.userDataService.setUserData(this.onboardingData);
    
    // Navigate based on user type
    if (this.onboardingData.userType === 'citizen') {
      console.log('Citizen detected - navigating to citizen dashboard...');
      this.router.navigate(['/citizen']);
    } else {
      console.log('Tourist detected - navigating to main app...');
      this.router.navigate(['/main']);
    }
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Accessibility Support';
      case 2:
        return 'Who are you?';
      case 3:
        return 'How long are you staying?';
      case 4:
        return 'What do you want to do?';
      default:
        return '';
    }
  }

  getStepDescription(): string {
    switch (this.currentStep) {
      case 1:
        return 'Let us know if you need any accessibility assistance to make your experience better';
      case 2:
        return 'Select your profile to personalize your experience';
      case 3:
        return 'Help us plan your stay better';
      case 4:
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
