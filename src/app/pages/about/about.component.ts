import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  teamMembers = [
    {
      name: 'Mayank Rathore',
      position: 'Founder & CEO',
      image: 'assets/images/team/1.jpg',
      description: 'Passionate about creating unique fragrances that tell a story.'
    },
    {
      name: 'Sarah Johnson',
      position: 'Head Perfumer',
      image: 'assets/images/team/2.jpg',
      description: 'Expert in crafting exquisite scents with over 15 years of experience.'
    },
    {
      name: 'Raj Patel',
      position: 'Creative Director',
      image: 'assets/images/team/3.jpg',
      description: 'Bringing innovation and artistry to our fragrance collections.'
    }
  ];

  milestones = [
    {
      year: 2018,
      title: 'Company Founded',
      description: 'Royal Bloomaa was established with a vision to create unique fragrances.'
    },
    {
      year: 2019,
      title: 'First Collection Launch',
      description: 'Successfully launched our signature collection of premium perfumes.'
    },
    {
      year: 2020,
      title: 'International Expansion',
      description: 'Expanded our presence to international markets.'
    },
    {
      year: 2021,
      title: 'Award-Winning Fragrances',
      description: 'Received multiple awards for our innovative fragrance creations.'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }
} 