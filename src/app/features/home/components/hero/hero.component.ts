import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ProjectImage {
  src: string;
  alt: string;
  visible: boolean;
  position: { top: string; left: string };
  rotation: { x: number; y: number; z: number };
}

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent {
  profileImage: string = 'assets/images/profile.png';
  
  projectImages: ProjectImage[] = [
    { src: 'assets/images/projects/project-1.png', alt: 'Project 1', visible: false, position: { top: '0%', left: '0%' }, rotation: { x: 0, y: 0, z: 0 } },
    { src: 'assets/images/projects/project-2.png', alt: 'Project 2', visible: false, position: { top: '0%', left: '0%' }, rotation: { x: 0, y: 0, z: 0 } },
    { src: 'assets/images/projects/project-3.png', alt: 'Project 3', visible: false, position: { top: '0%', left: '0%' }, rotation: { x: 0, y: 0, z: 0 } },
    { src: 'assets/images/projects/project-4.png', alt: 'Project 4', visible: false, position: { top: '0%', left: '0%' }, rotation: { x: 0, y: 0, z: 0 } },
    { src: 'assets/images/projects/project-5.png', alt: 'Project 5', visible: false, position: { top: '0%', left: '0%' }, rotation: { x: 0, y: 0, z: 0 } },
    { src: 'assets/images/projects/project-6.png', alt: 'Project 6', visible: false, position: { top: '0%', left: '0%' }, rotation: { x: 0, y: 0, z: 0 } },
    { src: 'assets/images/projects/project-7.png', alt: 'Project 7', visible: false, position: { top: '0%', left: '0%' }, rotation: { x: 0, y: 0, z: 0 } },
    { src: 'assets/images/projects/project-8.png', alt: 'Project 8', visible: false, position: { top: '0%', left: '0%' }, rotation: { x: 0, y: 0, z: 0 } },
    { src: 'assets/images/projects/project-9.png', alt: 'Project 9', visible: false, position: { top: '0%', left: '0%' }, rotation: { x: 0, y: 0, z: 0 } },
    { src: 'assets/images/projects/project-10.png', alt: 'Project 10', visible: false, position: { top: '0%', left: '0%' }, rotation: { x: 0, y: 0, z: 0 } }
  ];

  currentImageIndex: number = 0;
  isHovering: boolean = false;
  isMobile: boolean = false;

  ngOnInit(): void {
    this.checkScreenSize();
    this.initializeProjectPositions();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.checkScreenSize();
  }

  checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    
    // Show all images on mobile with bottom positioning
    if (this.isMobile) {
      this.projectImages.forEach(img => {
        img.visible = true;
        img.position = this.getRandomBottomPosition();
      });
    } else {
      this.projectImages.forEach(img => img.visible = false);
    }
  }

  initializeProjectPositions(): void {
    if (this.isMobile) {
      this.projectImages.forEach((image) => {
        image.position = this.getRandomBottomPosition();
        image.rotation = this.getRandomRotation();
      });
    }
  }

  getRandomBottomPosition(): { top: string; left: string } {
    // Position images at bottom 40% of the container
    const top = Math.random() * 30 + 60; // 60% to 90% from top
    const left = Math.random() * 80 + 10; // 10% to 90% from left
    return { top: `${top}%`, left: `${left}%` };
  }

  getRandomRotation(): { x: number; y: number; z: number } {
    return {
      x: Math.random() * 30 - 15, // -15 to 15 degrees
      y: Math.random() * 30 - 15,
      z: Math.random() * 20 - 10  // -10 to 10 degrees
    };
  }

  onProfileHover(event: MouseEvent): void {
    if (this.isMobile) return; // Don't trigger on mobile

    this.isHovering = true;
    
    // Get mouse position relative to the container
    const container = event.currentTarget as HTMLElement;
    const rect = container.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    // Calculate percentage position
    const leftPercent = (mouseX / rect.width) * 100;
    const topPercent = (mouseY / rect.height) * 100;

    // Hide current image if any
    if (this.currentImageIndex > 0) {
      this.projectImages[this.currentImageIndex - 1].visible = false;
    }

    // Show next image at mouse position
    if (this.currentImageIndex < this.projectImages.length) {
      const currentImage = this.projectImages[this.currentImageIndex];
      
      // Set position to mouse location
      currentImage.position = {
        top: `${topPercent}%`,
        left: `${leftPercent}%`
      };
      
      // Randomize rotation for variety
      currentImage.rotation = this.getRandomRotation();
      currentImage.visible = true;
      
      this.currentImageIndex++;
    } else {
      // Reset and start over
      this.currentImageIndex = 0;
      this.projectImages.forEach(img => img.visible = false);
    }
  }

  onProfileLeave(): void {
    if (this.isMobile) return;

    this.isHovering = false;
    
    // Hide all images after leaving
    setTimeout(() => {
      if (!this.isHovering) {
        this.projectImages.forEach(img => img.visible = false);
        this.currentImageIndex = 0;
      }
    }, 300);
  }

  getImageStyle(image: ProjectImage): any {
    return {
      top: image.position.top,
      left: image.position.left,
      transform: `
        translate(-50%, -50%)
        perspective(1000px) 
        rotateX(${image.rotation.x}deg) 
        rotateY(${image.rotation.y}deg) 
        rotateZ(${image.rotation.z}deg)
      `
    };
  }

  downloadResume(): void {
    // Implement resume download logic
    window.open('assets/documents/resume.pdf', '_blank');
  }

  showProjects(): void {
    // Navigate to projects section or page
    console.log('Navigate to projects');
  }
}