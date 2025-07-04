import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface OnboardingData {
  userType: 'citizen' | 'tourist' | null;
  stayDuration: number | null;
  goals: string[];
  accessibilityNeeds: string[];
}

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private userDataSubject = new BehaviorSubject<OnboardingData>({
    userType: null,
    stayDuration: 1,
    goals: [],
    accessibilityNeeds: []
  });

  userData$ = this.userDataSubject.asObservable();

  constructor() {}

  setUserData(data: OnboardingData) {
    this.userDataSubject.next(data);
  }

  getUserData(): OnboardingData {
    return this.userDataSubject.value;
  }

  updateStayDuration(duration: number) {
    const currentData = this.userDataSubject.value;
    this.userDataSubject.next({
      ...currentData,
      stayDuration: duration
    });
  }
}
