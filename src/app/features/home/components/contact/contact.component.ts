import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { trigger, transition, style, animate } from '@angular/animations';
import { ContactFormData, EmailJSResponse, CountryCode } from './contact.interface';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'scale(0.9)' }))
      ])
    ])
  ]
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private http = inject(HttpClient);

  contactForm!: FormGroup;
  isSubmitting = false;
  showSuccessMessage = false;
  showErrorMessage = false;
  errorMessage = '';

  // Country codes list (you can expand this)
  countryCodes: CountryCode[] = [
    { code: '+20', name: 'Egypt', flag: '🇪🇬' },
    { code: '+1', name: 'USA', flag: '🇺🇸' },
    { code: '+44', name: 'UK', flag: '🇬🇧' },
    { code: '+971', name: 'UAE', flag: '🇦🇪' },
    { code: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
    { code: '+91', name: 'India', flag: '🇮🇳' },
    { code: '+86', name: 'China', flag: '🇨🇳' },
    { code: '+49', name: 'Germany', flag: '🇩🇪' },
    { code: '+33', name: 'France', flag: '🇫🇷' },
    { code: '+39', name: 'Italy', flag: '🇮🇹' },
    { code: '+34', name: 'Spain', flag: '🇪🇸' },
    { code: '+7', name: 'Russia', flag: '🇷🇺' },
    { code: '+61', name: 'Australia', flag: '🇦🇺' },
    { code: '+81', name: 'Japan', flag: '🇯🇵' },
    { code: '+82', name: 'South Korea', flag: '🇰🇷' },
  ];

  // EmailJS Configuration
  private readonly EMAILJS_SERVICE_ID = 'service_sydoyxa';
  private readonly EMAILJS_TEMPLATE_ID = 'template_psoh8f2';
  private readonly EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY'; // Make sure to add your public key
  private readonly EMAILJS_ENDPOINT = 'https://api.emailjs.com/api/v1.0/email/send';

  ngOnInit(): void {
    this.initializeForm();
  }

  /**
   * Initialize the reactive form with validation
   */
  private initializeForm(): void {
    this.contactForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      subject: ['', [Validators.required, Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      countryCode: ['+20', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  /**
   * Get form control for template access
   */
  get f() {
    return this.contactForm.controls;
  }

  /**
   * Submit the contact form
   */
  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.showSuccessMessage = false;
    this.showErrorMessage = false;

    const formData = this.contactForm.value as ContactFormData;
    const fullPhoneNumber = `${formData.countryCode}${formData.mobileNumber}`;

    const emailData = {
      service_id: this.EMAILJS_SERVICE_ID,
      template_id: this.EMAILJS_TEMPLATE_ID,
      user_id: this.EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: formData.fullName,
        from_email: formData.email,
        subject: formData.subject,
        phone_number: fullPhoneNumber,
        message: formData.message,
        to_email: 'dev.kerllos.ayad@gmail.com'
      }
    };

    this.http.post<EmailJSResponse>(this.EMAILJS_ENDPOINT, emailData, {
      responseType: 'text' as 'json'
    })
    .subscribe({
      next: () => {
        this.isSubmitting = false;
        this.showSuccessMessage = true;
        this.contactForm.reset();
        this.contactForm.patchValue({ countryCode: '+20' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          this.showSuccessMessage = false;
        }, 5000);
      },
      error: (error) => {
        this.isSubmitting = false;
        this.showErrorMessage = true;
        this.errorMessage = 'Something went wrong. Please try again.';
        console.error('EmailJS Error:', error);
        
        // Hide error message after 5 seconds
        setTimeout(() => {
          this.showErrorMessage = false;
        }, 5000);
      }
    });
  }

  /**
   * Close success message manually
   */
  closeSuccessMessage(): void {
    this.showSuccessMessage = false;
  }

  /**
   * Close error message manually
   */
  closeErrorMessage(): void {
    this.showErrorMessage = false;
  }
}