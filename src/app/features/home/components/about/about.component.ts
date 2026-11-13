import { AfterViewInit, Component, ElementRef, HostListener, PLATFORM_ID, ViewChild, computed, inject } from '@angular/core';
import { CommonModule, NgOptimizedImage, isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { LangService } from '@core/i18n/lang.service';
import { UI } from '@core/i18n/ui';
import { ScrollTriggerDirective } from '@shared/scroll-trigger.directive';
import { FallingTextPipe } from '@shared/falling-text.pipe';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, ScrollTriggerDirective, FallingTextPipe],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements AfterViewInit {
    @ViewChild('aboutContainer') aboutContainer!: ElementRef<HTMLDivElement>;
  @ViewChild('aboutText') aboutText!: ElementRef<HTMLParagraphElement>;
  private letterSpans: HTMLSpanElement[] = [];
  readonly langService = inject(LangService);
  readonly ui = computed(() => UI[this.langService.lang()]);
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  ngAfterViewInit() {
    // The word-by-word reveal is browser-only and English-only: on the server, and on the Arabic pages,
    // the paragraph stays plain text (Arabic text is never split, so letters keep joining)
    if (!this.isBrowser || this.langService.lang() === 'ar') return;

    setTimeout(() => {
      this.wrapLettersInSpans();
      this.handleScroll(); // Initial call
    }, 100);
  }

  private wrapLettersInSpans() {
    const paragraph = this.aboutText.nativeElement;
    
    if (!paragraph) {
      return;
    }

    const text = paragraph.textContent || '';
    paragraph.innerHTML = '';
    this.letterSpans = [];

    // One span per word; the spaces between words stay plain text
    for (const part of text.split(/(\s+)/)) {
      if (!part) continue;
      if (/^\s+$/.test(part)) {
        paragraph.appendChild(document.createTextNode(' '));
        continue;
      }
      const span = document.createElement('span');
      span.className = 'letter-span';
      span.textContent = part;
      span.style.opacity = '0.65';
      span.style.transition = 'opacity 0.3s ease';
      paragraph.appendChild(span);
      this.letterSpans.push(span);
    }
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
      
      let opacity = 0.65;
      
      if (scrollProgress <= fadeStart) {
        // Before this letter's fade starts
        opacity = 0.65;
      } else if (scrollProgress >= fadeEnd) {
        // After this letter's fade completes
        opacity = 1;
      } else {
        // During this letter's fade
        const letterProgress = (scrollProgress - fadeStart) / fadeRange;
        opacity = 0.65 + (letterProgress * 0.35); // Fade from 0.65 to 1.0
      }
      
      span.style.opacity = opacity.toFixed(3);
    });
  }
}
