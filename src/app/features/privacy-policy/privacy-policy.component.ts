import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit, OnDestroy {
  readonly appName = 'WhatsApp Shopify Order Confirmation';
  readonly ownerName = 'Kerllos Ayad';
  readonly contactEmail = 'kerllos.ayad@gmail.com';
  readonly policyUrl = 'https://k-ayad.com/privacy-policy';
  readonly lastUpdated = 'September 27, 2026';

  private previousDescription: string | null = null;

  constructor(
    private seoService: SeoService,
    private meta: Meta
  ) {}

  ngOnInit(): void {
    this.previousDescription = this.meta.getTag('name="description"')?.content ?? null;

    this.seoService.updateMetaTags({
      title: 'Privacy Policy | K-Ayad',
      description: 'Privacy Policy for the WhatsApp Shopify Order Confirmation application operated by Kerllos Ayad: how Shopify order data and WhatsApp Business Platform messages are processed.',
      ogUrl: this.policyUrl
    });
  }

  ngOnDestroy(): void {
    // Restore the site-wide description so other pages don't inherit this one
    if (this.previousDescription) {
      this.seoService.updateMetaTags({ description: this.previousDescription });
    }
  }
}
