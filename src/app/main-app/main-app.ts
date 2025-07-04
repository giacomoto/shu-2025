import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserDataService, OnboardingData } from '../services/user-data';
import { MapGraph } from '../map-graph/map-graph';

interface Event {
  id: string;
  title: string;
  description: string;
  type: 'event' | 'poi' | 'activity';
  day: number;
  time?: string;
  location: string;
  image?: string;
  category: string;
  duration?: string;
  price?: string;
}

@Component({
  selector: 'app-main-app',
  standalone: true,
  imports: [CommonModule, MapGraph],
  templateUrl: './main-app.html',
  styleUrl: './main-app.css',
})
export class MainAppComponent implements OnInit {
  currentTab = 'roadmap';

  userData: OnboardingData = {
    userType: null,
    stayDuration: 1,
    goals: [],
    accessibilityNeeds: [],
  };

  events: Event[] = [
    {
      id: '1',
      title: 'Breakfast at Bar Centrale',
      description: 'Start your day with a typical Italian coffee and croissant',
      type: 'activity',
      day: 1,
      time: '08:00',
      location: 'Piazza della Repubblica',
      category: 'Gastronomy',
      duration: '45 min',
      price: '€5-8',
    },
    {
      id: '2',
      title: 'Basilica of Santa Maria Maggiore',
      description: 'Medieval church with Pinturicchio frescoes',
      type: 'poi',
      day: 1,
      time: '09:30',
      location: 'Via Consolare',
      category: 'Art & History',
      duration: '1h 30min',
      price: 'Free',
    },
    {
      id: '3',
      title: 'Walk along the Walls',
      description: 'Panoramic view of the Umbria Valley',
      type: 'activity',
      day: 1,
      time: '11:00',
      location: 'Spello Walls',
      category: 'Nature',
      duration: '1h',
      price: 'Free',
    },
    {
      id: '4',
      title: 'Lunch at Ristorante Il Tempio',
      description: 'Traditional Umbrian cuisine with panoramic view',
      type: 'activity',
      day: 1,
      time: '13:00',
      location: 'Via Giulia',
      category: 'Gastronomy',
      duration: '1h 30min',
      price: '€25-35',
    },
    {
      id: '5',
      title: 'Infiorata Workshop',
      description: 'Learn the art of flower carpets with local masters',
      type: 'event',
      day: 2,
      time: '10:00',
      location: 'Historic Center',
      category: 'Culture',
      duration: '2h',
      price: '€15',
    },
    {
      id: '6',
      title: 'Cantina Perticaia',
      description: 'DOC Umbria wine tasting',
      type: 'poi',
      day: 2,
      time: '15:00',
      location: 'Provincial Road',
      category: 'Wine & Food',
      duration: '1h',
      price: '€20',
    },
    {
      id: '7',
      title: 'Artisan Shopping',
      description: 'Ceramic shops and local products',
      type: 'activity',
      day: 2,
      time: '16:30',
      location: 'Via Roma',
      category: 'Shopping',
      duration: '1h 30min',
      price: 'Variable',
    },
    {
      id: '8',
      title: 'Dinner at Ristorante La Bastiglia',
      description: 'Refined cuisine in a historic setting',
      type: 'activity',
      day: 2,
      time: '20:00',
      location: 'Via Salnitraria',
      category: 'Gastronomy',
      duration: '2h',
      price: '€40-60',
    },
    {
      id: '9',
      title: "Church of Sant'Andrea",
      description: 'Romanesque church with medieval artworks',
      type: 'poi',
      day: 3,
      time: '09:00',
      location: "Via Sant'Andrea",
      category: 'Art & History',
      duration: '45min',
      price: 'Free',
    },
    {
      id: '10',
      title: 'Monte Subasio Hike',
      description: 'Trekking with views of Assisi and Perugia',
      type: 'activity',
      day: 3,
      time: '11:00',
      location: 'Monte Subasio',
      category: 'Nature',
      duration: '3h',
      price: '€10',
    },
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

  getEventsByDay(day: number): Event[] {
    return this.events.filter((event) => event.day === day);
  }

  getEventIcon(type: string): string {
    switch (type) {
      case 'event':
        return '🎉';
      case 'poi':
        return '🏛️';
      case 'activity':
        return '🎯';
      default:
        return '📍';
    }
  }

  getEventColor(type: string): string {
    switch (type) {
      case 'event':
        return 'event';
      case 'poi':
        return 'poi';
      case 'activity':
        return 'activity';
      default:
        return 'default';
    }
  }

  getTabTitle(): string {
    switch (this.currentTab) {
      case 'map':
        return 'Map';
      case 'chatbot':
        return 'Chatbot';
      case 'profile':
        return 'Profile';
      default:
        return 'Itinerary';
    }
  }

  getPageTitle(): string {
    switch (this.currentTab) {
      case 'roadmap':
        return 'Your Itinerary';
      case 'map':
        return 'Interactive Map';
      case 'chatbot':
        return 'Chatbot Assistant';
      case 'profile':
        return 'Your Profile';
      default:
        return 'OlivIA';
    }
  }

  getPageSubtitle(): string {
    switch (this.currentTab) {
      case 'roadmap':
        return `Stay of ${this.userData.stayDuration} ${
          this.userData.stayDuration === 1 ? 'day' : 'days'
        }`;
      case 'map':
        return 'Explore all points of interest in Spello';
      case 'chatbot':
        return 'Ask questions and get help from the virtual assistant';
      case 'profile':
        return 'Manage your preferences and settings';
      default:
        return 'Your Spello Experience';
    }
  }

  trackByDay(index: number, day: number): number {
    return day;
  }

  trackByEvent(index: number, event: Event): string {
    return event.id;
  }
}
