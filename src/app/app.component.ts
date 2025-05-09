import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { Location } from '@angular/common';
import { NavigationService } from './services/navigation.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatComponent, RouterModule],
  standalone: true,
  providers: [NavigationService],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'my-ai-chatbot';

  constructor(private _navService: NavigationService, private _location: Location) {}

  isActive(route: string): boolean {
    return this._location.path().includes(route);
  }

  navigateTo(route: string): void {
    this._navService.navigateTo(`/${route}`);
  }
}
