import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserDataService, OnboardingData } from '../services/user-data';

interface CitizenLink {
  id: string;
  title: string;
  description: string;
  icon: string;
  url?: string;
  category: string;
  isExternal?: boolean;
}

@Component({
  selector: 'app-citizen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './citizen.html',
  styleUrl: './citizen.css'
})
export class CitizenComponent implements OnInit {
  currentTab = 'services';
  
  userData: OnboardingData = {
    userType: null,
    stayDuration: 1,
    goals: []
  };

  citizenLinks: CitizenLink[] = [
    {
      id: '1',
      title: 'Municipality Services',
      description: 'Official services and documents',
      icon: '🏛️',
      category: 'services',
      url: 'https://www.comune.spello.pg.it'
    },
    {
      id: '2',
      title: 'Public Transport',
      description: 'Bus schedules and routes',
      icon: '🚌',
      category: 'transport',
      url: 'https://www.umbriamobilita.it'
    },
    {
      id: '3',
      title: 'Healthcare',
      description: 'Local health services and pharmacies',
      icon: '🏥',
      category: 'health',
      url: 'https://www.uslumbria1.it'
    },
    {
      id: '4',
      title: 'Schools',
      description: 'Educational institutions in Spello',
      icon: '🎓',
      category: 'education'
    },
    {
      id: '5',
      title: 'Events Calendar',
      description: 'Upcoming events and festivals',
      icon: '📅',
      category: 'events'
    },
    {
      id: '6',
      title: 'Local News',
      description: 'Latest news from Spello',
      icon: '📰',
      category: 'news'
    },
    {
      id: '7',
      title: 'Waste Collection',
      description: 'Garbage collection schedule',
      icon: '♻️',
      category: 'services'
    },
    {
      id: '8',
      title: 'Public Library',
      description: 'Library services and opening hours',
      icon: '📚',
      category: 'culture'
    },
    {
      id: '9',
      title: 'Sports Facilities',
      description: 'Gyms, pools, and sports centers',
      icon: '⚽',
      category: 'sports'
    },
    {
      id: '10',
      title: 'Emergency Contacts',
      description: 'Police, fire, ambulance',
      icon: '🚨',
      category: 'emergency'
    },
    {
      id: '11',
      title: 'Local Markets',
      description: 'Market days and locations',
      icon: '🛒',
      category: 'shopping'
    },
    {
      id: '12',
      title: 'Cultural Heritage',
      description: 'Museums and historical sites',
      icon: '🏛️',
      category: 'culture'
    }
  ];

  categories = [
    { id: 'services', name: 'Services', icon: '🏛️' },
    { id: 'transport', name: 'Transport', icon: '🚌' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'education', name: 'Education', icon: '🎓' },
    { id: 'events', name: 'Events', icon: '📅' },
    { id: 'news', name: 'News', icon: '📰' },
    { id: 'culture', name: 'Culture', icon: '🏛️' },
    { id: 'sports', name: 'Sports', icon: '⚽' },
    { id: 'emergency', name: 'Emergency', icon: '🚨' },
    { id: 'shopping', name: 'Shopping', icon: '🛒' }
  ];

  constructor(
    private router: Router,
    private userDataService: UserDataService
  ) {}

  ngOnInit() {
    // Get user data from service
    this.userData = this.userDataService.getUserData();
  }

  setTab(tab: string) {
    this.currentTab = tab;
  }

  getLinksByCategory(category: string): CitizenLink[] {
    return this.citizenLinks.filter(link => link.category === category);
  }

  openLink(link: CitizenLink) {
    if (link.url) {
      if (link.isExternal) {
        window.open(link.url, '_blank');
      } else {
        // Handle internal navigation if needed
        console.log('Opening internal link:', link.url);
      }
    } else {
      console.log('Link clicked:', link.title);
      // Handle internal actions
    }
  }

  getPageTitle(): string {
    switch (this.currentTab) {
      case 'services': return 'City Services';
      case 'transport': return 'Transport';
      case 'health': return 'Healthcare';
      case 'education': return 'Education';
      case 'events': return 'Events';
      case 'news': return 'Local News';
      case 'culture': return 'Culture';
      case 'sports': return 'Sports';
      case 'emergency': return 'Emergency';
      case 'shopping': return 'Shopping';
      default: return 'Spello Citizen';
    }
  }

  getPageSubtitle(): string {
    switch (this.currentTab) {
      case 'services': return 'Essential services for Spello residents';
      case 'transport': return 'Public transport and mobility';
      case 'health': return 'Healthcare services and facilities';
      case 'education': return 'Schools and educational resources';
      case 'events': return 'Upcoming events and activities';
      case 'news': return 'Latest news and updates';
      case 'culture': return 'Cultural heritage and activities';
      case 'sports': return 'Sports facilities and activities';
      case 'emergency': return 'Emergency contacts and services';
      case 'shopping': return 'Local markets and shopping';
      default: return 'Your Spello Community';
    }
  }

  trackByLink(index: number, link: CitizenLink): string {
    return link.id;
  }
} 