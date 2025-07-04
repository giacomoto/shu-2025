import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface OnboardingData {
  userType: 'citizen' | 'tourist' | null;
  stayDuration: number | null;
  goals: string[];
}

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

  availableGoals = [
    'Esplorare i monumenti storici',
    'Assaggiare la cucina locale',
    'Visitare le cantine e degustare vini',
    'Fare shopping di prodotti tipici',
    'Fotografare i paesaggi',
    'Partecipare a eventi culturali',
    'Conoscere la storia di Spello',
    'Camminare per le vie del centro',
    'Visitare le chiese e l\'arte sacra',
    'Rilassarsi e godersi l\'atmosfera'
  ];

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

  onDurationChange(event: any) {
    this.onboardingData.stayDuration = parseInt(event.target.value);
  }

  getDurationDisplay(): string {
    if (!this.onboardingData.stayDuration) return '1';
    return this.onboardingData.stayDuration.toString();
  }

  getDurationUnit(): string {
    if (!this.onboardingData.stayDuration) return 'Giorno';
    return this.onboardingData.stayDuration === 1 ? 'Giorno' : 'Giorni';
  }

  toggleGoal(goal: string) {
    const index = this.onboardingData.goals.indexOf(goal);
    if (index > -1) {
      this.onboardingData.goals.splice(index, 1);
    } else {
      this.onboardingData.goals.push(goal);
    }
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
    // Here you would typically save the data and navigate to the main app
    // For now, we'll just log it
  }

  getStepTitle(): string {
    switch (this.currentStep) {
      case 1:
        return 'Chi sei?';
      case 2:
        return 'Quanto tempo rimani?';
      case 3:
        return 'Cosa vuoi fare?';
      default:
        return '';
    }
  }

  getStepDescription(): string {
    switch (this.currentStep) {
      case 1:
        return 'Seleziona il tuo profilo per personalizzare la tua esperienza';
      case 2:
        return 'Aiutaci a pianificare al meglio il tuo soggiorno';
      case 3:
        return 'Scegli le attività che ti interessano di più';
      default:
        return '';
    }
  }
}
