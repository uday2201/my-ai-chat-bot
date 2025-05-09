import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, model } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey = 'sk-proj-2-4ePhrzTLFxTnCLVzZh4cTRQoSEHUjj9txw0qQz48H1y7a36'
   + '-MOifipLEfpzCHAKBQ6VA3d-mT3BlbkFJgT7MINR8ttN5r-E4sjLtXaEkZyxosK95eE6Rt9Ssl'
   + 'bxCmgmcprZkmFvIRPpSI-5pymOAxYRdIA';

  private apiUrl = 'https://api.openai.com/v1/chat/completions'; 
  private getModelsUrl = 'https://api.openai.com/v1/models';

  private currentModel = new BehaviorSubject<string>('gpt-4.1');
  currentModel$ = this.currentModel.asObservable();

  constructor(private _hhtp: HttpClient) { }

  setCurrentModel(model: string): void {
    this.currentModel.next(model);
    localStorage.setItem('openai-model', model);
  }

  // Get current model synchronously
  getCurrentModel(): string {
    return this.currentModel.value;
  }

  initializeModel() {
    const savedModel = localStorage.getItem('openai-model');
    if (savedModel) {
      this.currentModel.next(savedModel);
    }
  }

  generateResponse(prompt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      "model": this.getCurrentModel(),
      "messages": [
        {
          "role": "developer",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": prompt
        }
      ]
    };

    return this._hhtp.post(this.apiUrl, body, {headers: headers});


  }

  getAiModel() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });
    return this._hhtp.get(this.getModelsUrl, {headers: headers});
  }
}
