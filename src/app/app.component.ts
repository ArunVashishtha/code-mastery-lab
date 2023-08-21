import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'code-mastery-lab';
  @HostListener('contextmenu', ['$event'])
  onContextMenu(event: Event) {
    // Prevent the default right-click behavior
    event.preventDefault();
  }
}
