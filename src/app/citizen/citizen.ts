import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
  imports: [CommonModule, FormsModule],
  templateUrl: './citizen.html',
  styleUrl: './citizen.css',
})
export class CitizenComponent implements OnInit {
  currentTab = 'services';
  isChatbotOpen = false;
  isClosing = false;

  userData: OnboardingData = {
    userType: null,
    stayDuration: 1,
    goals: [],
    accessibilityNeeds: [],
  };

  reportForm = {
    issueType: '',
    title: '',
    description: '',
    location: '',
    priority: 'medium',
    attachments: [] as string[]
  };

  issueTypes = [
    { value: 'streetlight', label: 'Streetlight Problem', icon: '💡' },
    { value: 'pothole', label: 'Pothole', icon: '🕳️' },
    { value: 'garbage', label: 'Garbage Collection', icon: '🗑️' },
    { value: 'traffic', label: 'Traffic Signal', icon: '🚦' },
    { value: 'water', label: 'Water Issue', icon: '💧' },
    { value: 'noise', label: 'Noise Complaint', icon: '🔊' },
    { value: 'other', label: 'Other', icon: '❓' }
  ];

  priorityLevels = [
    { value: 'low', label: 'Low', color: '#22c55e' },
    { value: 'medium', label: 'Medium', color: '#f59e0b' },
    { value: 'high', label: 'High', color: '#ef4444' },
    { value: 'urgent', label: 'Urgent', color: '#dc2626' }
  ];

  citizenLinks: CitizenLink[] = [
    {
      id: '1',
      title: 'Municipality Services',
      description:
        'Official services and documents (certificates, permits, etc.)',
      icon: '🏛️',
      category: 'services',
      url: 'https://www.comune.spello.pg.it',
    },
    {
      id: '2',
      title: 'Waste Collection',
      description: 'Garbage collection schedule and recycling info',
      icon: '♻️',
      category: 'services',
    },
    {
      id: '3',
      title: 'Tax Payments',
      description: 'Pay local taxes and fees (IMU, TARI, etc.)',
      icon: '💶',
      category: 'services',
    },
    {
      id: '4',
      title: 'Civil Registry',
      description: 'Birth, marriage, and death certificates',
      icon: '📄',
      category: 'services',
    },
    {
      id: '5',
      title: 'Public Utilities',
      description: 'Water, electricity, and gas services',
      icon: '💡',
      category: 'services',
    },
    {
      id: '6',
      title: 'Social Services',
      description: 'Support for families, elderly, and vulnerable citizens',
      icon: '🤝',
      category: 'services',
    },
    {
      id: '7',
      title: 'School Services',
      description: 'School enrollment, canteen, and transport',
      icon: '🎒',
      category: 'services',
    },
    {
      id: '8',
      title: 'Public Library',
      description: 'Library services and opening hours',
      icon: '📚',
      category: 'services',
    },
    {
      id: '9',
      title: 'Lost & Found',
      description: 'Report or recover lost items',
      icon: '🔎',
      category: 'services',
    },
    {
      id: '10',
      title: 'Report an Issue',
      description: 'Report problems (streetlights, potholes, etc.)',
      icon: '🛠️',
      category: 'services',
    },
    {
      id: '11',
      title: 'Public Transport',
      description: 'Bus schedules and routes',
      icon: '🚌',
      category: 'transport',
      url: 'https://www.umbriamobilita.it',
    },
    {
      id: '12',
      title: 'Healthcare',
      description: 'Local health services and pharmacies',
      icon: '🏥',
      category: 'health',
      url: 'https://www.uslumbria1.it',
    },
    {
      id: '13',
      title: 'Events Calendar',
      description: 'Upcoming events and festivals',
      icon: '📅',
      category: 'events',
    },
    {
      id: '14',
      title: 'Local News',
      description: 'Latest news from Spello',
      icon: '📰',
      category: 'news',
    },
    {
      id: '15',
      title: 'Sports Facilities',
      description: 'Gyms, pools, and sports centers',
      icon: '⚽',
      category: 'sports',
    },
    {
      id: '16',
      title: 'Emergency Contacts',
      description: 'Police, fire, ambulance',
      icon: '🚨',
      category: 'emergency',
    },
    {
      id: '17',
      title: 'Local Markets',
      description: 'Market days and locations',
      icon: '🛒',
      category: 'shopping',
    },
    {
      id: '18',
      title: 'Cultural Heritage',
      description: 'Museums and historical sites',
      icon: '🏛️',
      category: 'culture',
    },
    {
      id: '19',
      title: 'Bus Schedules',
      description: 'Local and regional bus routes and timetables',
      icon: '🚌',
      category: 'transport',
      url: 'https://www.umbriamobilita.it',
    },
    {
      id: '20',
      title: 'Train Station',
      description: 'Spello train station info and connections',
      icon: '🚆',
      category: 'transport',
      url: 'https://www.trenitalia.com',
    },
    {
      id: '21',
      title: 'Taxi Services',
      description: 'Local taxi contacts and booking info',
      icon: '🚖',
      category: 'transport',
    },
    {
      id: '22',
      title: 'Parking Areas',
      description: 'Public parking locations and info',
      icon: '🅿️',
      category: 'transport',
    },
    {
      id: '23',
      title: 'Bike Sharing',
      description: 'Bike rental and sharing services in Spello',
      icon: '🚲',
      category: 'transport',
    },
    {
      id: '24',
      title: 'Accessible Transport',
      description: 'Transport options for people with reduced mobility',
      icon: '♿',
      category: 'transport',
    },
    {
      id: '25',
      title: 'Local Clinics',
      description: 'General practitioners and specialist clinics in Spello',
      icon: '🏥',
      category: 'health',
    },
    {
      id: '26',
      title: 'Pharmacies',
      description: 'Pharmacy locations and opening hours',
      icon: '💊',
      category: 'health',
    },
    {
      id: '27',
      title: 'Family Doctors',
      description: 'Contact information for local family doctors',
      icon: '🩺',
      category: 'health',
    },
    {
      id: '28',
      title: 'Pediatric Services',
      description: 'Pediatricians and child health services',
      icon: '👶',
      category: 'health',
    },
    {
      id: '29',
      title: 'Veterinary Services',
      description: 'Veterinarians and animal care',
      icon: '🐾',
      category: 'health',
    },
    {
      id: '30',
      title: 'Emergency Numbers',
      description: 'Emergency contacts for health and medical help',
      icon: '🚑',
      category: 'health',
    },
    {
      id: '31',
      title: 'DAE Locations',
      description: 'Public defibrillator (DAE) locations in Spello',
      icon: '❤️‍🩹',
      category: 'health',
    },
    {
      id: '32',
      title: 'Infiorate di Spello',
      description: 'Annual flower festival with stunning floral carpets',
      icon: '🌸',
      category: 'events',
    },
    {
      id: '33',
      title: 'Olive Oil Festival',
      description: 'Celebration of local olive oil with tastings and events',
      icon: '🫒',
      category: 'events',
    },
    {
      id: '34',
      title: 'Weekly Market',
      description: 'Traditional market with local products and crafts',
      icon: '🛍️',
      category: 'events',
    },
    {
      id: '35',
      title: 'Summer Concerts',
      description: 'Open-air music concerts in the town squares',
      icon: '🎶',
      category: 'events',
    },
    {
      id: '36',
      title: 'Christmas Celebrations',
      description: 'Holiday events, markets, and nativity scenes',
      icon: '🎄',
      category: 'events',
    },
    {
      id: '37',
      title: 'Community Dinners',
      description: 'Social dinners and gatherings for residents',
      icon: '🍽️',
      category: 'events',
    },
  ];

  categories = [
    { id: 'services', name: 'Services', icon: '🏛️' },
    { id: 'transport', name: 'Transport', icon: '🚌' },
    { id: 'health', name: 'Health', icon: '🏥' },
    { id: 'events', name: 'Events', icon: '📅' },
    { id: 'report', name: 'Report Issue', icon: '🛠️' },
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
    return this.citizenLinks.filter((link) => link.category === category);
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
      if (link.title === 'Report an Issue') {
        this.setTab('report');
      }
    }
  }

  getPageTitle(): string {
    switch (this.currentTab) {
      case 'services':
        return 'City Services';
      case 'transport':
        return 'Transport';
      case 'health':
        return 'Healthcare';
      case 'education':
        return 'Education';
      case 'events':
        return 'Events';
      case 'news':
        return 'Local News';
      case 'culture':
        return 'Culture';
      case 'sports':
        return 'Sports';
      case 'emergency':
        return 'Emergency';
      case 'shopping':
        return 'Shopping';
      case 'report':
        return 'Report an Issue';
      default:
        return 'Spello Citizen';
    }
  }

  getPageSubtitle(): string {
    switch (this.currentTab) {
      case 'services':
        return 'Essential services for Spello residents';
      case 'transport':
        return 'Public transport and mobility';
      case 'health':
        return 'Healthcare services and facilities';
      case 'education':
        return 'Schools and educational resources';
      case 'events':
        return 'Upcoming events and activities';
      case 'news':
        return 'Latest news and updates';
      case 'culture':
        return 'Cultural heritage and activities';
      case 'sports':
        return 'Sports facilities and activities';
      case 'emergency':
        return 'Emergency contacts and services';
      case 'shopping':
        return 'Local markets and shopping';
      case 'report':
        return 'Report problems and issues in Spello';
      default:
        return 'Your Spello Community';
    }
  }

  trackByLink(index: number, link: CitizenLink): string {
    return link.id;
  }

  openChatbot() {
    this.isChatbotOpen = true;
    this.isClosing = false;
  }

  closeChatbot() {
    this.isClosing = true;
    // Delay closing to allow exit animation to complete
    setTimeout(() => {
      this.isChatbotOpen = false;
      this.isClosing = false;
    }, 200);
  }

  sendMessage(message: string) {
    // For now, just log the message (static functionality)
    if (message.trim()) {
      console.log('Citizen message:', message);
      // In a real implementation, this would send the message to a chatbot service
    }
  }

  addAttachment() {
    // Mock function to add attachments
    console.log('Adding attachment...');
    this.reportForm.attachments.push(`attachment_${this.reportForm.attachments.length + 1}.jpg`);
  }

  removeAttachment(index: number) {
    this.reportForm.attachments.splice(index, 1);
  }

  submitReport() {
    console.log('Submitting report:', this.reportForm);
    // This would integrate with the actual reporting system
    alert('Report submitted successfully! You will receive a confirmation email.');
    this.resetReportForm();
  }

  resetReportForm() {
    this.reportForm = {
      issueType: '',
      title: '',
      description: '',
      location: '',
      priority: 'medium',
      attachments: []
    };
  }

  loginWithCieID() {
    console.log('Initiating CieID login for report submission...');
    alert('CieID Integration - This will connect to the official CieID service for authentication.');
  }
}
