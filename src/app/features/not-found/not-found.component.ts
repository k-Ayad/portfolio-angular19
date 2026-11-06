import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '@core/services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss'
})
export class NotFoundComponent implements OnInit {
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.seoService.setNotFoundMeta(
      'Page not found | Kerllos Ayad',
      'This page does not exist. Go back to the home page or browse the Shopify and web projects by Kerllos Ayad.'
    );
    this.seoService.setStructuredData();
  }
}
