import { Component, AfterViewInit } from '@angular/core';
import { SVG, Svg } from '@svgdotjs/svg.js';
import { CommonModule } from '@angular/common';

interface RoadmapNode {
  icon: string;
  label: string;
  x: number;
  y: number;
  color: string;
  active: boolean;
  event: {
    title: string;
    description: string;
    time?: string;
    location?: string;
    category?: string;
    duration?: string;
    price?: string;
  };
}

@Component({
  selector: 'app-map-graph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-graph.html',
  styleUrl: './map-graph.css'
})
export class MapGraph implements AfterViewInit {
  private draw!: Svg;
  nodes: RoadmapNode[] = [
    { icon: '🏛️', label: 'Museum', x: 80, y: 100, color: '#4A7CFF', active: true, event: { title: 'Basilica of Santa Maria Maggiore', description: 'Medieval church with Pinturicchio frescoes', time: '09:30', location: 'Via Consolare', category: 'Art & History', duration: '1h 30min', price: 'Free' } },
    { icon: '⛰️', label: 'Mountain', x: 180, y: 200, color: '#4A7CFF', active: true, event: { title: 'Monte Subasio Hike', description: 'Trekking with views of Assisi and Perugia', time: '11:00', location: 'Monte Subasio', category: 'Nature', duration: '3h', price: '€10' } },
    { icon: '🛍️', label: 'Shopping', x: 280, y: 300, color: '#ccc', active: false, event: { title: 'Artisan Shopping', description: 'Ceramic shops and local products', time: '16:30', location: 'Via Roma', category: 'Shopping', duration: '1h 30min', price: 'Variable' } },
    { icon: '🍽️', label: 'Food', x: 180, y: 400, color: '#ccc', active: false, event: { title: 'Lunch at Ristorante Il Tempio', description: 'Traditional Umbrian cuisine with panoramic view', time: '13:00', location: 'Via Giulia', category: 'Gastronomy', duration: '1h 30min', price: '€25-35' } },
    { icon: '🎨', label: 'Art', x: 80, y: 500, color: '#ccc', active: false, event: { title: 'Infiorata Workshop', description: 'Learn the art of flower carpets with local masters', time: '10:00', location: 'Historic Center', category: 'Culture', duration: '2h', price: '€15' } },
  ];
  nodeRadius = 32;
  popup: { visible: boolean; x: number; y: number; event: any } = { visible: false, x: 0, y: 0, event: null };

  ngAfterViewInit() {
    this.draw = SVG().addTo('#roadmap-svg').size('100%', '100%').viewbox(0, 0, 400, 600);
    this.renderRoadmap();
  }

  renderRoadmap() {
    this.draw.clear();
    // Draw dotted lines between nodes
    for (let i = 0; i < this.nodes.length - 1; i++) {
      const n1 = this.nodes[i];
      const n2 = this.nodes[i + 1];
      this.draw.line(n1.x, n1.y, n2.x, n2.y)
        .stroke({ color: n1.active && n2.active ? '#4A7CFF' : '#bbb', width: 4, dasharray: '4,8' });
    }
    // Draw nodes
    this.nodes.forEach((node, idx) => {
      const group = this.draw.group();
      const circle = group.circle(this.nodeRadius * 2)
        .center(node.x, node.y)
        .fill(node.color)
        .stroke({ color: '#fff', width: 3 })
        .attr('cursor', 'pointer');
      const icon = group.text(node.icon)
        .font({ size: 32, anchor: 'middle', family: 'Apple Color Emoji, Segoe UI Emoji, NotoColorEmoji, sans-serif' })
        .center(node.x, node.y + 2);
      // Click logic
      group.on('click', () => {
        this.showPopup(node.x, node.y, node.event);
      });
    });
  }

  showPopup(x: number, y: number, event: any) {
    this.popup = { visible: true, x, y, event };
    // Trigger Angular change detection
    setTimeout(() => {}, 0);
  }

  closePopup() {
    this.popup.visible = false;
  }
}
