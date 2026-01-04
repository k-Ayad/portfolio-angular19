// scroll-trigger.directive.ts
import { 
  Directive, 
  ElementRef, 
  Output, 
  EventEmitter, 
  OnInit, 
  OnDestroy,
  Input 
} from '@angular/core';

@Directive({
  selector: '[appScrollTrigger]',
  standalone: true
})
export class ScrollTriggerDirective implements OnInit, OnDestroy {
  @Output() inView = new EventEmitter<boolean>();
  @Input() threshold: number = 0.5; // How much of element should be visible (0-1)
  @Input() triggerOnce: boolean = true; // Trigger animation only once
  
  private observer!: IntersectionObserver;
  private hasTriggered = false;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const options = {
      root: null, // viewport
      rootMargin: '0px',
      threshold: this.threshold
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && (!this.hasTriggered || !this.triggerOnce)) {
          this.hasTriggered = true;
          this.el.nativeElement.classList.add('in-view');
          this.inView.emit(true);
          
          if (this.triggerOnce) {
            this.observer.unobserve(this.el.nativeElement);
          }
        } else if (!entry.isIntersecting && !this.triggerOnce) {
          this.el.nativeElement.classList.remove('in-view');
          this.inView.emit(false);
        }
      });
    }, options);

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}