import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      [type]="type"
      [disabled]="disabled || loading"
      [class]="'btn btn-' + variant + ' btn-' + size"
      (click)="handleClick($event)">
      <span *ngIf="loading" class="spinner-border spinner-border-sm me-2"></span>
      <ng-content></ng-content>
    </button>
  `,
  styles: [`
    .btn {
      padding: 0.75rem 1.5rem;
      border: none;
      border-radius: 0.5rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      display: inline-flex;
      align-items: center;
      justify-content: center;

      &:disabled {
        opacity: 0.6;
        cursor: not-allowed;
      }

      &.btn-primary {
        background-color: #007bff;
        color: white;

        &:hover:not(:disabled) {
          background-color: #0056b3;
          transform: translateY(-2px);
        }
      }

      &.btn-secondary {
        background-color: #6c757d;
        color: white;

        &:hover:not(:disabled) {
          background-color: #545b62;
          transform: translateY(-2px);
        }
      }

      &.btn-outline {
        background-color: transparent;
        border: 2px solid #007bff;
        color: #007bff;

        &:hover:not(:disabled) {
          background-color: #007bff;
          color: white;
          transform: translateY(-2px);
        }
      }

      &.btn-sm {
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
      }

      &.btn-md {
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
      }

      &.btn-lg {
        padding: 1rem 2rem;
        font-size: 1.125rem;
      }
    }

    .spinner-border {
      width: 1rem;
      height: 1rem;
      border: 2px solid currentColor;
      border-right-color: transparent;
      border-radius: 50%;
      animation: spinner-border 0.75s linear infinite;
    }

    @keyframes spinner-border {
      to { transform: rotate(360deg); }
    }
  `]
})
export class ButtonComponent {
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() variant: 'primary' | 'secondary' | 'outline' = 'primary';
  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() disabled: boolean = false;
  @Input() loading: boolean = false;
  @Output() clicked = new EventEmitter<MouseEvent>();

  handleClick(event: MouseEvent) {
    if (!this.disabled && !this.loading) {
      this.clicked.emit(event);
    }
  }
}
