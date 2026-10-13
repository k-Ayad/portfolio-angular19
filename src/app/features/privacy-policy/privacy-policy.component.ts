import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './privacy-policy.component.html',
  styleUrl: './privacy-policy.component.scss'
})
export class PrivacyPolicyComponent implements OnInit {
  readonly appName = 'WhatsApp Shopify Order Confirmation';
  readonly ownerName = 'Kerllos Ayad';
  readonly contactEmail = 'kerllos.ayad@gmail.com';
  readonly policyUrl = 'https://k-ayad.com/privacy-policy';
  readonly lastUpdated = 'September 27, 2026';

  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    // Every page sets its own meta tags, so nothing needs restoring on destroy
    this.seoService.setPageMeta({
      title: 'Privacy Policy | K-Ayad',
      description: 'Privacy Policy for the WhatsApp Shopify Order Confirmation application operated by Kerllos Ayad: how Shopify order data and WhatsApp Business Platform messages are processed.',
      path: '/privacy-policy'
    });
  }
}
