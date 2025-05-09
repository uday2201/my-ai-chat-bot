import { Routes } from '@angular/router';
import { ChatComponent } from './components/chat/chat.component';
import { SettingsComponent } from './components/settings/settings.component';

export const routes: Routes = [
    { path: 'chat', component: ChatComponent },
    { path: 'settings', component: SettingsComponent }
  ];
