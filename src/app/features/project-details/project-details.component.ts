import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-project-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.scss'
})
export class ProjectDetailsComponent implements OnInit {
  projectId: string | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.projectId = this.route.snapshot.paramMap.get('id');
    // Load project details based on ID
  }
}
