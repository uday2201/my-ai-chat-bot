import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, model } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpenaiService {
  private apiKey = 'sk-proj-2-4ePhrzTLFxTnCLVzZh4cTRQoSEHUjj9txw0qQz48H1y7a36'
   + '-MOifipLEfpzCHAKBQ6VA3d-mT3BlbkFJgT7MINR8ttN5r-E4sjLtXaEkZyxosK95eE6Rt9Ssl'
   + 'bxCmgmcprZkmFvIRPpSI-5pymOAxYRdIA';

  private apiUrl = 'https://api.openai.com/v1/chat/completions'; 

  constructor(private _hhtp: HttpClient) { }

  generateResponse(prompt: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      "model": "gpt-4.1",
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
}
