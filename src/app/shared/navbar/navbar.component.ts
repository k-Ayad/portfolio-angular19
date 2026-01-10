// navbar.component.ts
import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  isScrolled = false;
  isMobileMenuOpen = false;

  // Navigation links
  navLinks = [
    { label: 'About Me', route: '/about' },
    { label: 'All Projects', route: '/projects' },
    { label: 'Contact Me', route: '/contact' }
  ];

  // Contact info
  contactInfo = {
    email: 'Kerllos.Ayad@Gmail.Com',
    phone: '0127 683 2755',
    emailUrl: 'mailto:Kerllos.Ayad@Gmail.Com',
    phoneUrl: 'tel:01276832755'
  };

  // Social links
  socialLinks = [
    { 
      name: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/kerllos-ayad',
      icon: 'fab fa-linkedin-in',
      color: '#00ff88'
    },
    { 
      name: 'GitHub', 
      url: 'https://github.com/kerllos-ayad',
      icon: 'fab fa-github',
      color: '#00ff88'
    }
  ];

  // Optional: Add blur effect on scroll
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }

  // Toggle mobile menu
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    
    // Prevent body scroll when menu is open
    if (this.isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }

  // Close mobile menu when link is clicked
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    document.body.style.overflow = 'auto';
  }
}