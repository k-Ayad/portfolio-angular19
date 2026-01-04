// falling-text.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

export interface FallingChar {
  char: string;
  delay: number;
}

@Pipe({
  name: 'fallingText',
  standalone: true
})
export class FallingTextPipe implements PipeTransform {
  /**
   * Transforms text into an array of characters with calculated delays
   * @param text - The text to animate
   * @param delayIncrement - Time delay between each letter from center (in seconds)
   * @param startDelay - Optional initial delay before animation starts (in seconds)
   * @returns Array of objects containing character and its delay
   */
  transform(
    text: string, 
    delayIncrement: number = 0.08, 
    startDelay: number = 0
  ): FallingChar[] {
    if (!text) return [];
    
    const chars = text.split('');
    const totalChars = chars.length;
    const middleIndex = Math.floor(totalChars / 2);
    
    return chars.map((char, index) => {
      // Calculate distance from center for center-out effect
      const distanceFromCenter = Math.abs(index - middleIndex);
      const delay = startDelay + (distanceFromCenter * delayIncrement);
      
      return {
        char: char === ' ' ? '\u00A0' : char, // Preserve spaces
        delay: delay
      };
    });
  }
}