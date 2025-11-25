import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimationService {

  constructor() { }

  /**
   * Observe elements for scroll animations
   */
  observeElements(selector: string, callback: (entry: IntersectionObserverEntry) => void) {
    const elements = document.querySelectorAll(selector);
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          callback(entry);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach(element => observer.observe(element));
    
    return observer;
  }

  /**
   * Add fade-in animation class to element
   */
  fadeIn(element: Element) {
    element.classList.add('fade-in');
  }

  /**
   * Add slide-up animation class to element
   */
  slideUp(element: Element) {
    element.classList.add('slide-up');
  }

  /**
   * Smooth scroll to element
   */
  scrollToElement(elementId: string, offset: number = 0) {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}
