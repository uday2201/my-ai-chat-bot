import { Component, OnInit } from '@angular/core';
import { OpenaiService } from '../../services/openai.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error/error-dialogue.component';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  imports: [CommonModule, FormsModule],
  providers: [OpenaiService],
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  prompt = '';
  messages: any[] = [];
  isGenerating: boolean = false;
  errorMessage = '';

  constructor(private _openAiService: OpenaiService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.isGenerating = false;
  }

  generateText() {
    this.errorMessage = '';
    if (!this.prompt?.trim()) {
      this.showError('Please enter a message');
      return;
    }
    if (this.isGenerating) return;  
    this.isGenerating = true;
    this.messages.push({text: this.prompt, sender: 'user'});
    this._openAiService.generateResponse(this.prompt).subscribe({
      next: (resp: any) => {
        this.messages.push({ text: resp.choices[0].text, sender: 'bot' });
        this.prompt = '';
        this.isGenerating = false;
      },
      error: (error) => {
        this.showError(error?.statusText || 'Failed to send message');
        console.error('Error generating response:', error);
        this.isGenerating = false;
        this.prompt = '';
      }
    });
  }

  private showError(message: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: { message },
      width: '300px'
    });
  }
}
