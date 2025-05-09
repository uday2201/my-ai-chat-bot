import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpenaiService } from '../../services/openai.service';

@Component({
    selector: 'app-settings',
    templateUrl: './settings.component.html',
    providers: [OpenaiService],
    imports: [CommonModule, FormsModule],
    styleUrls: ['./settings.component.scss']
  })
  export class SettingsComponent implements OnInit {
    models: Model[] = [];
    selectedModel: string = '';

    constructor(private _openAiService: OpenaiService) {}

    ngOnInit(): void {
        this._openAiService.initializeModel();
        this.selectedModel = this._openAiService.getCurrentModel();
         this._openAiService.getAiModel().subscribe({
            next: (resp: any) => {
                this.models = resp.data;
            },
            error: (error) => {
              console.error('Error generating response:', error);
            }
          });;
    }

    onModelChange(): void {
        this._openAiService.setCurrentModel(this.selectedModel);
    }
  }

  interface Model {
    id: string;
    object: string;
    created: number;
    owned_by: string;
  }
  
  interface ApiResponse {
    object: string;
    data: Model[];
  }