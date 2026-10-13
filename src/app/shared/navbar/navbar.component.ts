// navbar.component.ts
import { Component, HostListener, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

interface NavLink {
  label: string;
  route: string;
  fragment?: string; // Section id on the home page to scroll to
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  private router = inject(Router);

  isScrolled = false;
  isMobileMenuOpen = false;

  // Navigation links
  navLinks: NavLink[] = [
    { label: 'About Me', route: '/', fragment: 'about' },
    { label: 'All Projects', route: '/portfolio' },
    { label: 'Contact Me', route: '/', fragment: 'contact' }
  ];

  // Contact info
  contactInfo = {
    email: 'Kerllos.Ayad@Gmail.Com',
    phone: '+20 127 683 2755',
    emailUrl: 'mailto:Kerllos.Ayad@Gmail.Com',
    phoneUrl: 'tel:+201276832755'
  };

  // Social links
  socialLinks = [
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/k-ayad',
      icon: 'fab fa-linkedin-in',
      color: '#00ff88'
    },
    {
      name: 'GitHub',
      url: 'https://github.com/k-ayad',
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

  // Scroll to a home page section, navigating to home first when on another page
  scrollToSection(event: MouseEvent, sectionId: string) {
    // Let ctrl/cmd/shift/middle clicks open the link normally
    if (event.button !== 0 || event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    event.preventDefault();
    this.closeMobileMenu();

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      return;
    }

    // Router anchor scrolling handles the first jump; scroll again once
    // async sections (e.g. the projects carousel) have finished loading
    this.router.navigate(['/'], { fragment: sectionId }).then(() => {
      setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    });
  }
}
