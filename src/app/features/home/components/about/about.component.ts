import { AfterViewInit, Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollTriggerDirective } from '@shared/scroll-trigger.directive';
import { FallingTextPipe } from '@shared/falling-text.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule , ScrollTriggerDirective , FallingTextPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
    @ViewChild('aboutContainer') aboutContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('aboutText') aboutText!: ElementRef<HTMLParagraphElement>;
  private letterSpans: HTMLSpanElement[] = [];

  ngAfterViewInit() {
    setTimeout(() => {
      this.wrapLettersInSpans();
      this.handleScroll(); // Initial call
    }, 100);
  }

  private wrapLettersInSpans() {
    const paragraph = this.aboutText.nativeElement;
    
    if (!paragraph) {
      console.error('About text paragraph not found!');
      return;
    }

    // Get the text content
    const text = paragraph.textContent || '';
    console.log('Original text length:', text.length);
    
    // Clear the paragraph
    paragraph.innerHTML = '';
    
    this.letterSpans = [];

    // Create a span for each character
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const span = document.createElement('span');
      
      span.className = 'letter-span';
      
      // Handle spaces
      if (char === ' ') {
        span.innerHTML = '&nbsp;';
      } else {
        span.textContent = char;
      }
      
      // Set initial styles
      span.style.opacity = '0.2';
      span.style.display = 'inline';
      span.style.transition = 'opacity 0.3s ease';
      
      paragraph.appendChild(span);
      this.letterSpans.push(span);
    }
    
    console.log('Letter spans created:', this.letterSpans.length);
  }

  @HostListener('window:scroll', [])
  @HostListener('window:resize', [])
  handleScroll() {
    if (!this.letterSpans || this.letterSpans.length === 0) {
      return;
    }

    const textElement = this.aboutText.nativeElement;
    const rect = textElement.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Calculate when the element is in the viewport
    // Animation starts when text is at 70% of viewport height
    // Animation completes when text is at 30% of viewport height
    const triggerStart = windowHeight * 0.7;
    const triggerEnd = windowHeight * 0.3;
    
    const elementTop = rect.top;
    const elementBottom = rect.bottom;
    
    // Calculate scroll progress (0 to 1)
    let scrollProgress = 0;
    
    if (elementTop <= triggerStart && elementBottom >= triggerEnd) {
      // Element is in the animation range
      const animationRange = triggerStart - triggerEnd;
      const currentPosition = triggerStart - elementTop - 150;
      scrollProgress = currentPosition / animationRange;
      scrollProgress = Math.max(0, Math.min(1, scrollProgress));
    } else if (elementBottom < triggerEnd) {
      // Element has passed the animation range (fully visible)
      scrollProgress = 1;
    } else {
      // Element hasn't reached the animation range yet
      scrollProgress = 0;
    }
    

    // Apply opacity to each letter based on scroll progress
    this.letterSpans.forEach((span, index) => {
      // Calculate when this letter should start and finish fading in
      const letterRatio = index / this.letterSpans.length;
      
      // Each letter starts fading at its position ratio
      // and completes fading 20% later
      const fadeStart = letterRatio * 0.8; // Letters start fading across first 80% of scroll
      const fadeRange = 0.2; // Each letter fades over 20% of the scroll range
      const fadeEnd = fadeStart + fadeRange;
      
      let opacity = 0.2;
      
      if (scrollProgress <= fadeStart) {
        // Before this letter's fade starts
        opacity = 0.2;
      } else if (scrollProgress >= fadeEnd) {
        // After this letter's fade completes
        opacity = 1;
      } else {
        // During this letter's fade
        const letterProgress = (scrollProgress - fadeStart) / fadeRange;
        opacity = 0.2 + (letterProgress * 0.8); // Fade from 0.2 to 1.0
      }
      
      span.style.opacity = opacity.toFixed(3);
    });
  }
}
